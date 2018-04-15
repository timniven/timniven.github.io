---
layout: post
title: "[Paper] Word Representation Via Gaussian Embedding"
date: 2018-04-03
categories: papers word-embeddings
---



# Word Representation Via Gaussian Embedding

Vilnis and McCallum, ICLR, 2015

https://arxiv.org/pdf/1412.6623.pdf

## Problem and Solution

- Limitations of representing an object as a single point
  - does not naturally express uncertainty
  - comparison is usually done with dot products/cosine distance/Euclidean distance, none of which provide for asymmetric comparisons (as is necessary to represent inclusion or entailment)
  - relationships are measured by distance functions that satisfy the triangle inequality (is this constrictive?)
- So, Gaussians
  - innately represent uncertainty
  - provide a distance function per object
  - KL-divergence between Gaussians is straightforward to calculate, naturally asymmetric, and has a geometric interpretation as an inclusion between families of ellipses
  - can model uncertaintly, inclusion, entailment, and a rich geometry of the latent space

## Background Knowledge and Related Work

- Potential functions (Aizerman et al. 1964)
- Kernels (Lanckriet et al. 2004)
- Mixture Density Networks (Bishop 1994)
- Probabilistic matrix factorization (Mnih & Salakhutdinov 2007/8)
- Matrix factorization and universal schemas (Riedel et al. 2013)
- Embeddings and matrix factorization (Levy and Goldberg 2014) (show that word2vec is equivalent to factoring certain types of weighted pointwise mutual information matrices)
- Multiplicative tensor factorization for word embeddings (Kiros et al. 2014)
- Metric learning (Xing et al. 2002)
- Fitting mixture models to apply Fisher kernels to whole documents (Clinchant * Perronnin 2013a/b)
- Distributional inclusion hypothesis (Geffet & Dagan 2005)
- Words as regions in vector space (Erk 2009)
- Energy-based learning (LeCun et. al 2006)
- Expected likelihood or probability product kernel (Jebara et al. 2004)

## Details

### Loss

"we had difficulty using the word2vec loss that treats scores of positive and negative pairs as positive and negative examples to a binary classifier, since this relies on the ability to push up on the energy surface in an absolute, rather than relative, manner" => use a ranking based loss

$$L_m(w, c_p, c_n) = \max(0, m - E(w, c_p) + E(w, c_n))$$

This loss pushes scores of positive pairs above negatives by a margin

### Empirical Covariances

We can actually use pre-trained word vectors and their set of context vectors to calculate the variance of words (p. 3). However, the performance of this is inferior as it doesn't captured inclusion between ellipsoids.

### Energy-Based Learning of Gaussians

The model learns Gaussian embeddings to predict words in context given the current word, and ranks these over negatively sampled words. Two energy functions are presented.

#### Symmetric Similarity: Expected Likelihood or Probability Product Kernel

Dot product between means gives the expected dot product, but doesn't incorporate the covariances. The continuous version of the inner product is given by

$$\int_{x \in \Bbb{R}^n} f(x)g(x)dx$$

Thus for Gaussians (an exercise for later might be to do the calculus involved in proving this):

$$E(P_i, P_j) = \int_{x \in \Bbb{R}^n} \mathcal{N}(x; \mu_i, \Sigma_i) \mathcal{N}(x; \mu_j, \Sigma_j)dx = \mathcal{N}(0; \mu_i - \mu_j, \Sigma_i + \Sigma_j)$$

But, work with the logarithm of this because
- "we plan to use ranking loss, and ratios of densities and likelihoods are much more commonly worked with than differences - differences in probabilities are less interpretable than an odds ratio"
- more numerically stable - without, quantities can get exponentially small

$$\log \mathcal{N}(0; \mu_i - \mu_j, \Sigma_i + \Sigma_j) = -\frac12 \log \det (\Sigma_i + \Sigma_j) - \frac12(\mu_i - \mu_j)^\top(\Sigma_i + \Sigma_j)^{-1}(\mu_i - \mu_j) - \frac{d}{2} \log(2\pi)$$

where $d$ is the number of dimensions. I had a problem reproducing this calculation where I thought $(x - \mu) = (0 - (\mu_i - \mu_j))$ should be $\mu_j + \mu_i$ which doesn't tally with their $\mu_i - \mu_j$.

We can optimize with

$$
\begin{align*}
\frac{\partial \log E(P_i, P_j)}{\partial \mu_i} &= - \frac{\partial \log E(P_i, P_j)}{\partial \mu_j} = - \Delta_{ij} \\
\frac{\partial \log E(P_i, P_j)}{\partial \Sigma_i} &= \frac{\partial \log E(P_i, P_j)}{\partial \Sigma_j} = \frac12 (\Delta_{ij} \Delta_{ij}^\top - (\Sigma_i + \Sigma_j)^{-1}) \\
\Delta_{ij} &= (\Sigma_i + \Sigma_j)^{-1}(\mu_i - \mu_j)
\end{align*}
$$

Computational notes:
- The inverses are trivial to compute for diagonal/spherical matrices
- Same for full matrices for the kind of dimensionality involved in word embeddings
- If they have low-rank and diagonal stucture they can be computed and stored efficiently using the matrix inversion lemma (https://en.wikipedia.org/wiki/Woodbury_matrix_identity).

Geometric interpretation as similarity measure:
- Distance between Gaussians is measured by Mahalanobis distance, which measures distance between their means, defined by joint inverse covariance
- With reference to the term with the determinant, we are talking about the log volume of the ellipse spanned by the principle components. Increasing this volume will therefore lower energy. This acts as a regularizer, preventing the algorithm from decreasing distance by increasing joint variance. This encourages the distributions to have sharper peaks in order to have high energy.

#### Asymmetric Similarity: KL Divergence

This function is for representing entialment - or containment within ellipsoids generated by Gaussians. Being non-symmetric, entailment is directed, as we require. Specifically, a low KL divergence from $x$ to $y$ indicates that we can "encode" $y$ as easily as $x$, implying $y$ entails $x$, or is a super-class/concept.

Note that since KL divergence is a distance not a similarity (as in the first energy function above), we use a negative sign:

$$
\begin{align*}
-E(P-i, P_j) &= D_{KL}(\mathcal{N}_j \lVert \mathcal{N}_i) \\
&= \int_{x \in \Bbb{R}^n} \mathcal{N}(x; \mu_i, \Sigma_i) \log \frac{\mathcal{N}(x; \mu_j, \Sigma_j)}{\mathcal{N}(x; \mu_i, \Sigma_i)} dx \\
&= \frac12 \left( \text{tr}(\Sigma_i^{-1} \Sigma_j) + (\mu_i - \mu_j)^\top \Sigma_i^{-1} (\mu_i - \mu_j) - d - \log \frac{\det(\Sigma_j)}{\det(\Sigma_i)} \right)
\end{align*}
$$

Gradients

$$
\begin{align*}
\frac{\partial E(P_i, P_j)}{\partial \mu_i} &= - \frac{\partial E(P_i, P_j)}{\partial \mu_j} = - \Delta_{ij}' \\
\frac{\partial E(P_i, P_j)}{\partial \Sigma_i} &= \frac12 (\sigma_i^{-1} \Sigma_j \Sigma_i^{-1} + \Delta_{ij}' \Delta_{ij}'^\top - \Sigma_i^{-1}) \\
\frac{\partial E(P_i, P_j)}{\partial \Sigma_j} &= \frac12(\Sigma_j^{-1} - \Sigma_i^{-1}) \\
\Delta_{ij}' &= \Sigma_i^{-1}(\mu_i - \mu_j)
\end{align*}
$$

TODO: some matrix derivatives need reviewing there. Work through these derivations. The paper cites the Matrix Cookbook, section 8.2.

#### Uncertainty of Inner Products

We can then treat the scalar resulting from the inner product of Gaussian embeddings as a random variable with its own distribution. Citing Brown and Rutemiller (1977) they say this distribution is not a one-dimensional Gaussian, but has finite mean and variance if the two Guassian of the inner product are assumed to be independent. For $P(z = x^\top y)$

$$
\begin{align*}
\mu_z &= \mu_x^\top \mu_y \\
\Sigma_z &= \mu_x^\top \Sigma_x \mu_x + \mu_y^\top \Sigma_y \mu_y + \text{tr}(\Sigma_z \Sigma_y)
\end{align*}
$$

We can therefore determine upper and lower bounds for this product that hold some given percentage of the time - e.g. using some number of standard deviations we get a range for the dot product

$$
\mu_x^\top \mu_y \pm c \sqrt{\mu_x^\top \Sigma_x \mu_x + \mu_y^\top \Sigma_y \mu_y + \text{tr}(\Sigma_z \Sigma_y)}
$$

where $c$ could be an incorrect Gaussian approximation, or, the author's mention, a more general bound such as Chebyshev's inequality.

#### Regularization

To prevent the means from growing too large, they add L2 regularization

$$\lVert \mu_i \rVert_2 \le C, \ \forall i$$

Covariance matrices must be kept positive definite and reasonably sized. Add a hard constraint that the eigenvalues lie within the hypercube $[m, M]^d$ for constants $m$ and $M$.

$$mI \prec \Sigma_i \prec MI, \ \forall i$$

(Don't understand that notation).

In practice they say this ammounts to applying

$$\Sigma_{ii} \leftarrow \max(m, \min(M, \Sigma_{ii}))$$

#### Training Details

- Use AdaGrad
- Minibatches containing 20 sentences worth of tokens and contexts
- Word vectors have 50 dimensions
- All word types appearing less than 100 times int he training set are dropped
- Trained with one pass over the data
- 1 negative sample per positive
- Same subsampling procesures as Mikolov et al. 2013
- Diagonal covariances are used (except where noted)

## Discussion

Future work:
- Going beyond diagonal covariances, preventing the semantics from being axis-aligned, increasing capacity and expressivity
- Learn the representations robustly in one pass, not with SGD, but instead with proximal or block coordinate descent
- Different distributions (Student's t)
- Multimodal distributions
- Combining ideas from kernel methods and manifold learning with DL and linguistic representation learning
- Extend the use of potential function representations to, e.g., relational learning with universal schema