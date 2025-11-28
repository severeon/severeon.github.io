# NeuroScript: Neural Networks as Composable Pipelines

**Why do I need to become an expert in mathematics and learn one of the least accessible Python libraries I've ever encountered just to experiment with transformers?**

I tried drawing a PlantUML flowchart to understand how state changes ripple through the system. Eight boxes in, it clicked: **it's just a pipeline with middleware**.

But saying "10,000 disorganized notebooks and git repos totaling 200GB+ is blocking progress" feels inadequate. Magic is cool for a while, but programmers don't like black boxes. At least this one doesn't.

## The Core Idea

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

## Enter NeuroScript

NeuroScript is a DSL that compiles to PyTorch. It treats neurons as first-class compositional primitives with explicit dataflow. Here's GPT-2:
```neuroscript
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

## What's Next

I'm building this to make architecture exploration feel like playing with Legos instead of reading textbooks. Still figuring out details around recursive architectures and shape inference.

Like what you see? Maybe you see obvious problems I'm missing... I genuinely want to know!

---

*NeuroScript is a research project in active development. Implementation details are evolving.*
