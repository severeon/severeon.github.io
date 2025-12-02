# NeuroScript Blog

---

## Tuple Unpacking: Why Skip Connections Finally Click

*December 2024*

**Skip connections confused me for way too long.**

Reading papers, they're presented as "add the input back in." In PyTorch, it's:

```python
residual = x
x = self.layer1(x)
x = self.layer2(x)
x = x + residual  # Wait, where did residual come from again?
```

You have to mentally track variable lifetimes across dozens of lines. In a transformer with 12 layers? Good luck.

**NeuroScript makes this obvious with tuple unpacking:**

```bash
neuron Residual(dim):
    in: [*, dim]
    out: [*, dim]
    graph:
        # Fork the input into two paths
        in -> Fork() -> (main, skip)

        # Transform one path
        main -> MLP(dim) -> processed

        # Add them back together
        (processed, skip) -> Add() -> out
```

**What's happening?**

1. `Fork()` takes one tensor, outputs a tuple of two identical tensors
2. `(main, skip)` **unpacks** that tuple into named references
3. You can now route `main` through layers while `skip` waits
4. `(processed, skip)` **packs** them back into a tuple for `Add()`

The dataflow is **explicit**. No mental juggling of variable lifetimes. You can *see* the skip connection in the graph structure.

**This extends beautifully to complex patterns:**

```bash
# Multi-head attention with residual and layer norm
neuron TransformerBlock(d_model, num_heads, d_ff):
    in: [batch, seq, d_model]
    out: [batch, seq, d_model]
    graph:
        # Attention with skip
        in -> Fork() -> (attn_input, skip1)
        attn_input ->
            MultiHeadAttention(d_model, num_heads)
            attn_out
        (attn_out, skip1) -> Add() -> attn_residual

        # Layer norm
        attn_residual -> LayerNorm(d_model) -> normalized1

        # FFN with skip
        normalized1 -> Fork() -> (ffn_input, skip2)
        ffn_input -> FFN(d_model, d_ff) -> ffn_out
        (ffn_out, skip2) -> Add() -> ffn_residual

        # Final layer norm
        ffn_residual -> LayerNorm(d_model) -> out
```

**The pattern is crystal clear:**

1. Fork -> (process, skip)
2. Do work on `process`
3. (result, skip) -> Add
4. Repeat

Compare this to tracking `x_0`, `x_1`, `residual_1`, `residual_2` in PyTorch. NeuroScript's tuple unpacking makes the **structure** of the network match the **intent** of the architecture.

When you see `(a, b, c)` in the graph, you know exactly what's happening: dataflow is splitting or merging. No hidden state, no variable confusion.

---

## Training Made Simple: Convention Over Configuration

*December 2024*

**Here's what frustrated me about ML frameworks:**

- PyTorch: Too low-level, write your own training loops
- PyTorch Lightning: Better, but boilerplate-heavy
- Keras: Great API, but locked to TensorFlow (historically)
- Hugging Face: Amazing for transformers, but domain-specific

**I wanted:** Write the architecture, point to data, get training. No boilerplate.

**NeuroScript now has this.** Here's training XOR:

```bash
# 1. Write the architecture (01-xor.ns)
neuron XOR():
    in: [batch, 2]
    out: [batch, 1]
    graph:
        in ->
            Linear(2, 4)
            ReLU()
            Linear(4, 1)
            Sigmoid()
            out

# 2. Create training data (xor_train.jsonl)
{"input": [0.0, 0.0], "target": [0.0]}
{"input": [0.0, 1.0], "target": [1.0]}
{"input": [1.0, 0.0], "target": [1.0]}
{"input": [1.0, 1.0], "target": [0.0]}

# 3. Write a minimal config (xor_config.yml)
model:
  neuron: XOR
  file: examples/01-xor.ns

data:
  train: examples/data/xor_train.jsonl

training:
  epochs: 1000
  lr: 0.01

# 4. Train
python -m neuroscript_runtime.runner train --config xor_config.yml

# That's it!
```

**What makes this work? *Convention over Configuration***

The runner:

1. **Infers the task** from input/output shapes:
   - `[batch, 2] -> [batch, 1]` = Regression -> MSE loss
   - `[batch, seq] -> [batch, seq, vocab]` = Language Model -> CrossEntropy
   - `[batch, C, H, W] -> [batch, classes]` = Image Classification

2. **Picks sensible defaults:**
   - Optimizer: Adam (good for most things)
   - Batch size: 32
   - Logging: Every 100 steps
   - Checkpointing: Every 1000 steps

3. **Makes extension trivial:**

   ```python
   from neuroscript_runtime.contracts import DataLoaderContract, ContractRegistry

   class MyHuggingFaceLoader(DataLoaderContract):
       # Implement interface
       pass

   # Register it
   ContractRegistry.register_dataloader("huggingface", MyHuggingFaceLoader)

   # Use in config:
   # data:
   #   format: huggingface
   #   dataset: "wikitext"
   ```

**The Contract System** is the secret sauce. Five extension points:

- **DataLoader**: How to load data (default: JSONL files)
- **Loss**: How to compute error (default: inferred from task)
- **Optimizer**: How to update weights (default: Adam)
- **Checkpoint**: How to save/load (default: `torch.save`)
- **Logger**: How to track progress (default: console)

Ship with one good default for each. Make it trivial to swap in custom implementations. Let the community build the ecosystem.

**The full Python API:**

```python
from neuroscript_runtime.runner_v2 import train_from_config
from xor_model import XOR  # Generated by NeuroScript compiler

model = XOR()
runner = train_from_config(model, "config.yml")

# Inference
import torch
result = runner.infer(torch.tensor([[1.0, 0.0]]))
print(result)  # [0.9999] ≈ 1.0
```

**Why this matters:** You can go from idea to trained model in minutes, not hours. When you need custom behavior, the extension points are obvious. When you need full control, it's just PyTorch under the hood—drop down anytime.

**Batteries included. Escape hatch provided.**

---

## Neural Networks as Composable Pipelines

*November 2024*

**Why do I need to become an expert in mathematics and learn one of the least accessible Python libraries I've ever encountered just to experiment with transformers?**

I tried drawing a PlantUML flowchart to understand how state changes ripple through the system. Eight boxes in, it clicked: **it's just a pipeline with middleware**.

But saying "10,000 disorganized notebooks and git repos totaling 200GB+ is blocking progress" feels inadequate. Magic is cool for a while, but programmers don't like black boxes. At least this one doesn't.

### The Core Idea

**Neurons** are a powerful abstraction because they reduce granularity from *lines of PyTorch and math* to Lego-brick sized AI concepts. Everything is a neuron, neurons are made of neurons, and we're running middleware on a pipeline moving arrays of floats through a computational landscape.

**Middleware** takes input, applies a transformation, and passes the result to the next stage:

```
input -> [middleware, ...] -> output
```

Simple, right?

**What if neural networks were actually *this* simple?**

```
in -> embedding -> FFN -> out
```

### Enter NeuroScript

NeuroScript is a DSL that compiles to PyTorch. It treats neurons as first-class compositional primitives with explicit dataflow. Here's GPT-2:

```bash
use core,nn/*

# Complete GPT-style language model
neuron GPT(vocab_size, d_model, num_layers, num_heads, d_ff, max_seq_len):
  in: [batch, seq]  # Token IDs
  out: [batch, seq, vocab_size]  # Logits
  let:
    layers = Sequential(num_layers, TransformerBlock)
  graph:
    in ->
      Embedding(vocab_size, d_model)
      embedded

    embedded ->
      PositionalEncoding(d_model, max_len=max_seq_len)
      positioned

    positioned ->
      layers(d_model, num_heads, d_ff)
      features

    features ->
      LayerNorm(d_model)
      normalized

    normalized ->
      Linear(d_model, vocab_size)
      out

# Smaller test model for quick experiments
neuron TinyGPT(vocab_size):
  in: [batch, seq]
  out: [batch, seq, vocab_size]
  graph:
    in -> GPT(vocab_size, 256, 4, 4, 1024, 512) -> out

# GPT-2 Small configuration
neuron GPT2Small(vocab_size):
  in: [batch, seq]
  out: [batch, seq, vocab_size]
  graph:
    in -> GPT(vocab_size, 768, 12, 12, 3072, 1024) -> out
```

That's it. Compare this to [any PyTorch GPT-2 implementation](https://github.com/karpathy/nanoGPT/blob/master/model.py).

### What's Next

I'm building this to make architecture exploration feel like playing with Legos instead of reading textbooks. Still figuring out details around recursive architectures and shape inference.

Like what you see? Maybe you see obvious problems I'm missing... I genuinely want to know!

---

*NeuroScript is a research project in active development. Implementation details are evolving.*
