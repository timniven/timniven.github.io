---
layout: post
title: "Maximum Entropy Modeling"
date: 2018-02-09
categories: maxent
---

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

The following notes taken from <a href="http://www.cs.cmu.edu/afs/cs/user/aberger/www/html/tutorial/node2.html">this tutorial</a>.

Distribute probability accordingly where we know how to from the data,
and uniformly everywhere else (i.e. make no assumptions). How this is
achieved is described below.

Motivating example is French translations of "in", where the possibles
form a set of five French words.

Training data is then a collection of pairs of (in, French), yielding
the empirical distribution

$$\tilde{p}(x, y) = \frac1{N} \times \text{number of times that} \ (x, y) \ \text{occurs in the sample}$$

We want to model the process that generated this sample. And model is

$$p(y|x)$$

If we find that following "April" the probability that "in" translates
to "dans" is \\(9/10\\), we can establish an "indicator function" \\(f(x, y)\\).
We then calculate the expected value of this:

$$\tilde{p}(f) = \sum_{x, y} \tilde{p}(x, y) f(x, y)$$

We then constrain our model to satisfy the constraint

$$p(f) =\sum_{x, y} \tilde{p}(x)p(y|x)f(x,y) = \sum_{x,y} \tilde{p}(x,y)f(x,y)$$

We then take all our constraints and limit our attention to the subset
of models that satisfy them. See <a href="http://www.cs.cmu.edu/afs/cs/user/aberger/www/html/tutorial/node6.html">this page</a>
for a geometric view of it. Interestingly, since the linear constraints are taken
from the training samples, it is not possible for them to be inconsistent.

The maxent principle is then applied, which says that amongst the remaining
models under consideration \\(C\\) we choose the one that is most uniform. This
is measured by <a href="https://en.wikipedia.org/wiki/Conditional_entropy">conditional entropy</a>:

$$H(p) = \sum_{x,y} \tilde{p}(x)p(y|x)\log p(y|x)$$

We then select the model with the most entropy (or uniformity):

$$p^* = \text{argmax}_{p \in C} H(p)$$

To further motivate the choice of this model, <a href="http://www.cs.cmu.edu/afs/cs/user/aberger/www/html/tutorial/node8.html">it can be shown</a> that this
model is also a maximum likelihood estimator.




