---
layout: post
title: "Hierarchical Probabilistic Neural Network Language Model - Morin and Bengio (2005)"
date: 2018-02-09
categories: language-model
---

Reading for rough understanding and getting the flavour of their style of thinking
and problem solving - ignoring certain details.

Problem Description
---
- Statistical language models are hit hard by the curse of dimensionality due
  to the massive number of potential combinations of words
- In training we realistically can only observe a fraction of all possible cases
- So, how to distribute probability mass?
- A knowledge-free notion of similarity is said to not work well in high dimensional
  spaces such as sequences of words - therefore a non-parametric similarity approach
  will not succeed
- At the time of writing, successful generalization had been achieved by observing
  that sequences that share shorter subsequences are similar and should share
  probability mass
- However, due to the variation in natural language expression, we cannot just
  consider word matches, since sentences that are worded completely different
  can have the same meaning
- This in turn motivates solutions like grouping words by "classes" - e.g. by a
  clustering algorithm; or, more familiar to contemporary ears, by defining
  similarity in terms of a continuous-valued feature vector
- This is what Bengio's (2003) innovation did: thanks to the "smoothness" of the
  function the neural net learns due to distributed representations of words, we
  are able to effectively assign probability density for generalization
- NOTE of interest to me: this model is related to maximum entropy models, as
  the unnormalized log probabilities are linear functions of the features input
  to the classification layer, where those features can be considered as the
  indicators or presence of words
- The problem with the above, which the paper seeks to address, is the long
  training time: in the softmax layer we normalize our probabilities over all
  words in the vocabulary, which is a potentially very expensive operation

Solution
---

- The main idea is to partition the words into classes:

$$P(Y=y|X=x) = P(Y=y|C=c(y),X)P(C=c(y)|X=x)$$

- This works out (thanks to the law of total probability) because all \\(y\\) are
  in one and only one class and all classes cover the entire word space
- This means we need only a fraction of the normalizations: with 100,000 words in
  100 classes each with 100 words, we need only do two normalizations with 100
  items in each (100 classes in the sample space and 100 words in the relevant
  class)
- To build these classes they use the wordnet hierarchy to build a binary tree
- Whilst the WordNet tree is not binary, they perform hierarchical clustering to
  make it so
