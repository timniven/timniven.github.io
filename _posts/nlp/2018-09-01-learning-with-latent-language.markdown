---
layout: post
title: "[Paper] Learning with Latent Language"
date: 2018-09-01
categories: nlp papers
---

[Andreas et al. NAACL 2018](https://arxiv.org/abs/1711.00482)

## Problem

The efficient automatic discovery of abstract structure.
Think few-shot learning.

"We seek an intermediate language of task representations that, like
in program synthesis, is both expressive and compact, but like in
multitask approaches is learnable directly from training data without
domain engineering.

## Solution

Use language as a latent *parameter space* for few-shot learning.

"The structure of natural language reflects the structure of the world."
Language tells us about the kinds of abstractions that we find useful
for interpreting and navigating our environment.

"Our thesis is that language is a powerful, general-purpose kind of
pre-training, even for tasks that do not directly involve language."
Natural language hypotheses mean
- easier to discover compositional concepts in the training examples
- harder to overfit to few examples
- easier to understand inferred patterns

By "equipping models with the ability to think out loud when learning
they become both more comprehensible and more accurate."

Natural langauge:
- is discrete
- has a rich set of compositional operators
- comes equipped with a natural description length prior
- flexible semantics
- plenty of annotated data exists for learning from language
- provides a strong prior about the kinds of abstractions that are
  useful for natural learning problems

## Details

### Generic Approach

Three stages:

#### 1. Language Learning

The **language learning** phase using different datasets $$i$$.
The datasets have samples like $$\{ (\mathbf{x}_1^{(li)},
\mathbf{w}_1^{(li)}, y_1^{(li)}), \dots, (\mathbf{x}_n^{(li)},
\mathbf{w}_1^{(li)}, y_n^{(li)}) \}$$.
The idea is to turn the tokens $$\mathbf{w}^{(li)}$$ into a function
$$f(\mathbf{x}, \mathbf{\eta}, y)$$ mapping from inputs
$$\mathbf{x}^{(li)}$$ to outputs $$y^{(li)}$$.
For example an image rating model that gives a scalar value
$$y^{(li)}$$ indicating how well a natural language description
$$\mathbf{w}^{(li)}$$ matches an image $$\mathbf{x}^{(li)}$$.
They call this function a **language interpretation model**.
The job in this phase is to learn the real-valued parameters
$$\mathbf{\eta}$$

$$
\arg \max_{\mathbf{\eta} \in \Bbb{R}^a}
\sum_{i, j}
L \left(
  f(\mathbf{x}_j^{(li)}; \mathbf{\eta}, \mathbf{w}^{(li)}),
  y_j^{(li)}
\right)
$$

#### 2. Concept Learning

The **concept learning** basically trains to a specific target dataset
with samples $$\{ (\mathbf{x}_1^{(c)}, y_1^{(c)}), \dots,
(\mathbf{x}_n^{(c)}, y_n^{(c)}) \}$$. This is now **an optimization
problem over natural language strings**:

$$
\arg \max_{\mathbf{w}' \in \Sigma*}
\sum_j
L \left(
  f(\mathbf{x}_j^{(c)}; \mathbf{\eta}, \mathbf{w}^{(c)}),
  y_j^{(c)}
\right)
$$

This is an unusual optimization problem for me.
They propose to fit a **reverse proposal model** estimating

$$
\arg \max_\lambda \log q(\mathbf{w}_i|\mathbf{x}_1^{(li)}, y_1^{(li)},
\dots, \mathbf{x}_n^{(li)}, y_n^{(li)}; \lambda)
$$

This $$q$$ gives a distribution over strings expressing how likely they
are to be a match given the input data. They say it's an image
captioning model in practice.

They sample from this distribution and perform optimization over the
resulting set of candidate strings $$\Sigma*$$ that are expected to
obtain small loss.

#### 3. Evaluation

Apply learned concept to new input $$\mathbf{x}^{(e)}$$ to obtain
prediction $$y^{(e)}$$. This is done by drawing a fixed number of
sample strings, find the one that achieves minimum loss, and then use
$$f(\mathbf{x}^{(e)}; \mathbf{\eta}, \mathbf{w}^{(c)})$$ to make the
prediction.

### Details of their Approach

#### Few-Shot Classification

The learner sees four images which are positive examples of some visual
concept - e.g. "a red circle above a blue square" - and must decide if
a fifth held-out image matches the same concept.

The **interpretation model** is implemented as a VGGNet that encodes
the image, and an RNN encoder for descriptions

$$
f(\mathbf{x}, \mathbf{w}) = \sigma(\text{rnn-encode}(\mathbf{w})^\top
\text{rep}(\mathbf{x}))
$$

which outputs a probability that the image matches the description and
is trained using maximum log-likelihood.

Their **proposal model** is defined as

$$
q(\mathbf{w}|\{\mathbf{x}_j\}) = \text{rnn-decode}(\mathbf{w} | \frac1n
\sum_j \text{rep}(\mathbf{x}_j))
$$

They want to answer
1. Does the addition of language help as compared to multi-task or
   meta-learning?
2. It is better to use language as a hypothesis space or as additional
   supervision?

In the few-shot setting they answer (1) by comparing to MTL and ML
models. But I am not sure how to evaluate it as a comparison right
now. I will have to come back after learning more about multi-task and
meta-learning.

#### Programming by Demonstration

See five string transformations and have to apply the same to a sixth
input. There is also a natural language description of the
transformation.

$$
\begin{align*}
\text{rep}(x, y) &= \text{rnn-encode}([x, y]) \\
f(y | x; w) &= \text{rnn_decode} \left( y | \text{rnn-encode}(x), \text{rnn-encode}(w)] \right) \\
q(w | \{(x_j, y_j)\}) &= \text{rnn-decode} \left( w | \frac1n \sum_j \text{rep}(x_j, y_j) \right)
\end{align*}
$$

Results:
- They compare using regular expressions to using natural language and
  find natural language superior. They hypothesize this is due to the
  extra variation in natural language helping the model figure out the
  true axes of variation and avoid overfitting
- Providing ground truth annotations was worse than letting the model
  perform inference on its own. They hypothesize this is due to the
  model being more reliable than the human annotators who sometimes
  write, e.g., "I don't know".

#### Reinforcement Learning

The task is treasure hunting where the treasure is in some location a
fixed distance from some landmark. These are randomized over episodes.
Nothing in the agent's observations should suggest these things are
related - but for the natural language descriptions.

The goal is to adapt quickly to new environments. The hypothesis is that
from the beginning, instead of searching in random parameter space,
which often leads to nonsensical behaviour, searching in the space of
natural language strings will at least lead to some reasonable policy,
which should in turn lead to faster learning. I find that very
compelling.

$$
\begin{align*}
\text{rep}(x) &= \tanh(\text{fc}(\tanh(\text{fc}(x)))) \\
f(a| x; w) &\propto \text{rnn-encode}(w)^\top W_a \text{rep}(x) \\
q(w) &= \text{rnn-decode}(w)
\end{align*}
$$

At language learning time it is assumed to have natural language
descriptions of the target locations provided by human annotators and
expert policies for navigating there.

Learning proceeds by:
- sampling a fixed number of descriptions $$w$$ from $$q$$
- for each, rollout the policy induced and estimate average reward
- take highest scoring description and perform further fine-tuning

At language learning time the agent has access to 250 environments and
is evaluated on a further 50.

Results indeed show faster learning and "show that the model has used
the structure provided by language to *learn* a better representation
space for policies - one that allows it to sample from a distribution
over interesting and meaningful behaviors rather than sequences of
random actions."

## Datasets

ShapeWorld
- Kuhnle and Copestake (2017)

Their own string editing dataset.

Adaptation of a natural language navigation dataset
- Janner et al. (2017)

## Background and Related Work

Inductive program synthesis approaches reduce the hypothesis space by
moving the problem out of continuous space and into the discrete space
of program descriptors
- Gulwani (2011)
- version space algebras: Lau et al. 2003
- type systems: Kitzelmann and Schmid (2006)

But the computational primitives necessary to describe every hypothesis
must be specified by hand a priori by a human designer.

Multi-task learning
- Caruana (1998)

Meta-learning
- Schmidhuber (1987)
- Santoro et al. (2016)
- Vinyals et al. (2016)

Image rating model
- Socher et al. (2014)

Techniques aimed at making synthesis more efficient
- Devlin et al. (2017)

Image captioning model
- Donahue et al. (2015)

Visual reasoning problems where a natural language explanation must be
inferred
- Raven (1936)
- Bongard (1968)

Visual question answering
- Johnson et al. (2017)
- Suhr et al. (2017)

Similar ideas to the RL task, in the context of human concept learning
- Hermer-Vazquez et al. (2001)

Instruction following model of a kind well studied in the NLP literature
- Branavan et al. (2009)

DAgger
- Ross et al. (2011)

Policy gradients
- Williams (1992)

Using natural language annotations to guide the discovery of logical
descriptions of concepts
- Ling et al. (2017)
- Srivastava et al. (2017)

Using structured language-like annotations to improve learning of
generalizable structured policies
- Andreas et al. (2017)
- Denil et al. (2017)

Using natural language at concept learning time for RL agents for
- high level structure: Branavan et al. (2011)
- environment dynamics: Narasimhan et al. (2017)
- exploration: Harrison et al. (2017)

Dataset augmentation strategy used in Navigation and Regex datasets
- Jia and Liang (2016)

Automatic template induction system (again data augmentation)
- Kwiakowski et al. (2011)

## Discussion

- Via their comparisons they make the case that this is a feasible
  technique, which is very interesting. However, I have not seen any
  specific discussion of they hypothesis that the performance increase
  is due to discovery of compositional concepts. It is a tantalizing
  hypothesis and I would like more said, or more investigation into
  this aspect (unless I have missed it). Insofar as it is discussed it
  seems to be a given from the nature of language itself. It would be
  nice to see examples of learned behavior demonstrating this.
- The vocabulary used in these datasets is very small (see appendix).
  This work is meant to be an initial exploration on smaller, toy tasks,
  which I am totally on board with. But of course the next step is to
  wonder how it could work with much larger and more complicated
  natural language. Will their particular techniques be scalable? Have
  we the datasets to do it?
- It seems the same function $$f(x, \eta, w)$$ is used at both language
  and concept learning time. It feels like this is restricting - it
  seems the problems need to be the same, because the parameters are
  the same. E.g., if as in the example we have a model rating how well
  an image matches a description, how do we then use that for the
  regex task? We are mapping from an image to a scalar in the first
  case - that is what $$\eta$$ has learned to do. It doesn't seem like
  we can then use the same function for a different task.
- How can we generalize if we don't have a complete set of natural
  language strings at language learning time?
- Relatedly, I am thinking about Bengio's Consciousness Prior, wherein
  he argued convincingly in my view for the benefits of having hidden
  units mapped to words or phrases. The idea here seems to be somewhat
  different, although some of the motivations align a little bit. I
  don't think this paper qualifies as progress towards Bengio's idea,
  but does further demonstrate that it is a good one.
- It also seems that the optimization step over natural language strings
  is not ideal.
- I am also thinking about recent work I've read (and must review) about
  learning a more explicit space using words...
