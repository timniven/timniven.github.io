---
layout: post
title: "[Paper] The Consciousness Prior"
date: 2018-08-12
categories: ai
---

[Bengio (2017)](https://arxiv.org/pdf/1709.08568)

## Summary

- Consciousness as awareness of one's thoughts
- This should be *low-dimensional*. Why? Conscious thought is limited to
  "a few \[handful of\] concepts" at a time. We use these concepts to
  form statements to base predictions and decisions upon. E.g., we
  might see a paw print on a table and predict "a cat lives in this
  house". It is intuitive that this prediction would come from higher
  level abstractions - a lower-dimensional **abstract** space and not
  very high-dimensional pixel space.
- The **representation RNN** $$F$$ can be thought of as the content of
  almost the whole brain, apart from the weights, that summarizes recent
  and past observations. It will yield a very high-dimensional
  **representation state** $$h_t$$ based on the current observed state
  $$s_t$$:

$$
h_t = F(s_t, h_{t-1})
$$

- The **consciousness RNN** $$C$$ then yields the **conscious state**
  $$c_t$$, a very low-dimensional vector, and is derived from an
  attention mechanism over the representation state plus some noise
  $$z_t$$:

$$
c_t = C(h_t, c_{t-1}, z_t)
$$

- The addition of noise introduces randomness into the attention
  mechanism, useful for exploring different options in thinking - e.g.
  different interpretations, different plans of action, different
  predictions about the future.
- For training objectives in general we want to capture the idea that
  these high-level features are useful for prediction and action.
  Focusing on prediction, a **verifier network** measures the
  consistency between a current representation state and a past
  conscious state:

$$
V(h_t, c_{t-k}) \in \mathbb{R}
$$

- Since the conscious state attends to some feature locations in the
  representation state, it will be useful to know which ones they are.
  For this reason a "key, value" system could be useful. This will be
  vital for the verifier network to align the predictions with the
  representation state.
- There is a mapping from conscious states to language utterances. But
  the mapping in the other direction is underdetermined - it is
  postulated that the conscious state is richer. This apts with my own
  experience - an utterance sets off many of my own internal
  associations, enthymeme fillers, etc. It also apts with the fact that
  the same utterance can be interpreted in different ways - context
  matters.
- It is therefore suggested as a regularization term that the attended
  elements of the conscious states be mappable to already heard phrases
  or words. This in turn implies that the representation states
  $$h_t$$ be regularized by language, that their features be mappable
  roughly to words or short phrases.
- It follows from this that language facilitates thinking and
  understanding - a point I am well on board with - that language helps
  us build sharper internal representations, more disentangled, which
  helps us learn better, and enable collaborative taslk solving.
  References to follow this idea: Bengio et al. (2009) "Curriculum
  learning"; Bengio (2014) "Deep learning and cultural evolution".
- It would be of benefit to interprebility if a network could map its
  abstract space to utterances, as it could then explain its decisions.

## Concerns

- Given the variety of phenomena that can come into consciousness, I was
  originally struggling to see how a low-dimensional space could handle
  everything required of it. However I am still struggling to conceive
  how this works, though the principles seem to be very well motivated
  and exciting.
- It would be nice to see some concrete examples.

## Of Personal Interest

- Andreas et al. (2017) "Learning with Latent Language" of related
  interest.
- The idea of a thinking network might help me scratch the itch I've had
  for a long time wondering about Eureka moments. Suppose the agent goes
  into thinking mode to solve a problem. It can explore (with some
  randomness) possibilities until it finds one that solves its problem.
  How that would actually work algorithmically I don't know, but at
  least this architecture allows it to happen. Perhaps this idea may
  connect with Schmidhuber's work on fast and slow memory updates. I
  encounter some input that jars with my world model, so I try and
  resolve the issue through thinking - when I find a solution I can make
  a fast update to my world model. (That really is idealistic, but AI
  can do better than humans). Perhaps Charles Yang's work from the NAACL
  keynote could be a nice toy task to test this? I would also like to
  use this for supervised learning - have a mechanism that picks out
  **salient examples** from the training data - i.e. ones that are
  challenging or provide the most opportunity for learning given the
  current state of the network (maybe the worst misclassifications) -
  commits them to memory, and can use them later in this kind of
  "thinking -> Eureka -> fast update" process.
- Regarding my CCQ project: it could be worth keeping the original form
  of the questions for a time when networks do have the ability to
  answer questions in language mapped from their internal states.
  However the question of evaluating the answers would remain a problem.
