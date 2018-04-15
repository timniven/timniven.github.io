---
layout: post
title: "[Paper] Multimodal Word Distributions"
date: 2018-04-05
categories: papers word-embedding gaussian-mixture
---

# Multimodal Word Distributions

Athiwaratkun and Wilson (2017), ACL

https://arxiv.org/abs/1704.08424

## Problem and Solution

- Vilnis and McCallum's single mode Gaussian embeddings are overly diffuse for words with multiple meanings
- The mean is pulled in multiple directions, leading to bias
- Therefore, multi-modal representations

## Background Knowledge and Related Work

- Having read Vilnis and McCallum (2015) much of the relevant background is already in there
- Hierarchical softmax (needs review): Mikolov et al. 2011a, Mnih and Hinton 2008, Morin and Bengio 2005
- Noise contrastive estimation: Gutmann and Hyvarinen 2012
- Polysemy
  - Cluster centroid of context vectors - Huang et al. 2012
  - Adapted skip-gram with EM algorithm (Tian et al. 2014)
  - Nelakantan et al. (2014) non-parametric approach to determining number of word senses
  - Liu et al. 2015 - topical embeddings based on latent topic models
  - Infinite dimensional-space where embeddings gradually represent incremental word sense if complex meanings are observed (Nalisnick and Ravi 2015)

## Details

Many details are similar to Vilnis and McCallum (2014), so I only note significant points or differences here.

### Mixture Function

Mixture function for a word

$$
\begin{align*}
  f_w(\vec{x}) &= \sum_{i=1}^K p_{w,i} \mathcal{N}(\vec{x}; \vec{\mu}_{w,i}, \Sigma_{w, i}) \\
               &= \sum_{i=1}^K \frac{p_{w,i}}{\sqrt{2 \pi \lvert \Sigma_{w, i} \rvert}} \exp \left( -\frac12 (\vec{x} - \vec{\mu}_{w, i})^\top \Sigma_{w, i}^{-1} (\vec{x} - \vec{\mu}_{w, i}) \right)
\end{align*}
$$

where $\sum_{i=1}^K p_{w, i} = 1$.

### Expected Likelihood Kernel

The derivation is quite trivial following Vilnis and McCallum (2015). $f$ and $g$ are the mixture functions for two words.

$$
\begin{align*}
  \log E(f, g) &= \log \sum_i \sum_j p_i q_i \exp(\xi_{i, j}) \\
  \xi_{i, j}   &\equiv \log \mathcal{N}(0; \vec{\mu}_{f, i} - \vec{\mu}_{g, j}, \Sigma_{f, i} + \Sigma_{g, j}) \\
               &= \frac12 \log \det( \Sigma_{f, i} + \Sigma_{g, j}) - \frac{d}{2} \log (2 \pi) - \frac12 (\vec{\mu}_{f, i} - \vec{\mu}_{g, j})^\top (\Sigma_{f, i} + \Sigma{g, j}^{-1} (\vec{\mu}_{f, i} - \vec{\mu}_{g, j})
\end{align*}
$$

It can be seen that we are dealing with multiple sense of each word at a time here, where the term $(\vec{\mu}_{f, i} - \vec{\mu}_{g, j})^\top (\Sigma_{f, i} + \Sigma{g, j}^{-1} (\vec{\mu}_{f, i} - \vec{\mu}_{g, j})$ is measuring the similarity of these two senses of the two words in question.

### Why Not KL Divergence?

The authors note there is no closed form for KL divergence if the two distributions are Gaussian mixtures.

## Discussion

- We still have to predefine $K$ ???
- We still have diagonal covariance
- No KL divergence - review the list of benefits (theoretical and empirical) reported by Vilnis and McCallum. If really desirable, that is a research question here - how to get it for a mixture model?