---
title: 'Tuple Unpacking: Skips that Click'
description: 'NeuroScript makes skip connections obvious with tuple unpacking.'
pubDate: 'Dec 02 2024'
---

**NeuroScript makes skip connections obvious with tuple unpacking:**

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
