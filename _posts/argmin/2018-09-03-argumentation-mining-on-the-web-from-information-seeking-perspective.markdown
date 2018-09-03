---
layout: post
title: "[Paper] Argumentation Mining from the Web from Information Seeking Perspective"
date: 2018-09-03
categories: argmin papers
---

[Habernal et al. ACL 2014](https://pdfs.semanticscholar.org/12b1/2ea73652da56023e0e4776211e4f4301f339.pdf)

- [Problem](#problem)
- [Claims and Findings](#claims-and-findings)
- [Argument Models Used](#argument-models-used)
- [Background and Related Work](#background-and-related-work)
- [Discussion](#discussion)

## Problem

A lot of work has been done fairly independently on particular domains
of argumentation mining. Different interpretations of argumentation have
developed, limiting cross-domain applicability. This work is also not
necessarily well connected to argumentation theories and therefore lacks
a suitable theoretical grounding.

The goal is then to bridge the gap between theories and practice and
provide some guidelines. This is explored via literature review and
annotation studies.

## Claims and Findings

### Main conclusions

1. The use-case of any research in argumentation mining must be clearly
   stated (i.e. in terms of expected outcomes)
2. Properties of the data under investigation must be taken into
   account, given the variety of genres and registers
3. An appropriate argumentation model must be chosen according to the
   requirements

### There is no one-size-fits-all argumentation theory

- Even argumentation researchers disagree on any widely-accepted
  ultimate concept
- Therefore NLP researchers cannot in principle adopt any particular
  theory without justification - i.e. its suitability for the particular
  task

### Walton's schemes are not as general and domain-independent as hoped

- Schneider and Wyner (2012) try to apply them to the product review
  domain; but only $$37.1\%$$ of observed arguments fall under the
  schemes, and new ad hoc schemes are required
- Cabrio et al. (2013a) try to map schemes to discourse relations in
  the Penn Discourse TreeBank; but again need to create two new schemes
  that they discover
- Therefore, the schemes lack appropriate coverage for dealing with
  real argumentation in natural language texts

### Annotating nested arguments is a drawback

- Kluge (2014) experimented with this in an annotation study and found
  that when introducing nested arguments, as opposed to linear
  arguments, IAA dropped considerably.

### Annotation Review Findings

- Most studies dealing with web data use a proprietary model without
  basis in argumentation theory
- IAA is either not reported or not based on a chance-corrected measure

### A high degree of controversiality improved summarization

- Carenini and Cheung (2008)
- "presenting argumentation in a condensed form (the large concepts of
  the argument are compressed or summarized) may improve argument
  comprehension"
- This is essentially my pragmatic idea, to try and predict what the
  person is arguing for as an aid to argument comprehension. That's how
  I do it, especially when the argument is bad and requires so much more
  interpretation - figure out what their point is and infer what the
  warrants must be.

### Annotation Experiment Findings

The claim-premise model was done on
- newspaper articles
- blog posts
- interviews

The Toulmin model was done on
- comments on articles and forum posts
- newspaper editorials
- blog posts

For claim-premise
- $$72.4\%$$ of arguments consist of one claim and a premise
- in $$59.5\%$$ of these the support follows the claim
- in only $$11.6\%$$ did the support precede the claim
- **what is the ratio of supports to attacks?**

For Toulmin
- IAA varies significantly with component type, with claim and grounds
  being the best, then backing then rebuttal; refutation is by far the
  lowest
- IAA higher for short texts such as comments; lower for longer
  documents such as blog posts and editorials
- Manual analysis revealed annotation difficulties especially where the
  discussion is complex (i.e. many sub-aspects are discussed) and where
  it proceeds in a dialogical manner
- The distinction between grounds and backing is too fuzzy

### Observations

Some dimensions that need to be considered when approaching any
particular AM annotation task
- There is a **variety of registers**
- **Length of documents***
- **Degree of structure**

Other properties
- Non-argumentative texts: sometimes an entire user comment has no
  argumentative contenxt
- Implicit warrants and even implicit claims
- Figurative language, fallacies, and narratives are prevalent in online
  context

## Argument Models Used

### Claim-Premise

They keep this **linear** by labeling adjacent components with

$$
\{
\text{claim}, \text{claim-restatement}, \text{pre-claim support},
\text{pre-claim attack}, \text{post-claim support},
\text{post-claim attack}
\}
$$

This prevents the construction of a graph, and nesting.

**Suitability**:
- simple model
- good for long web documents such as news articles, editorials, or
  blog posts
- cannot distinguish premise types - e.g. factual evidence versus
  common understanding

### Toulmin

They make some changes
- Omit the **qualifier** as people don't usually state their degree of
  certainty
- Omit the **warrant** as again it is not usually stated
- Extend **backing** to provide more information to back up the argument
- Add **refutation** as a rebuttal to the rebuttal

**Comments**
- Omitting the qualifier and warrant make sense from the point of view
  of annotation. Indeed, if the authors don't state them it is very
  difficult or impossible to say what they are.
- The new role of backing feels a bit too general
- Is refutation added to avoid nesting?

**Suitability**
- In natural language arguments premises play different roles; by
  expressing these the argument is more readily understandable and
  it is easier to identify the various ways in which it can be accepted
  or refuted (Bentahar et al. (2010, p.216)
- A complicated model
- The description of the components is often ambiguous
- Some components are left implicit (e.g. warrants, even claims)

## Background and Related Work

Argumentation mining on the web
- Schneider et al. (2012)
- Sergeant (2013)

Argumentation and philosophy and rhetoric
- Aristotle and Kennedy (translator) (1991)
- Perelman and Olbrechts-Tyteca (1991)
- Walton et al. (2008)

Argumentation and informal and formal logic
- Dun (1995)
- Henkmans (2000)
- Stoianovici (2009)
- Schneider et al. (2013)
- Hunter (2013)

Argumentation and educational research
- Weinberger and Fischer (2006)
- Noroozi et al. (2013)

Argumentation and pragmatics
- Xu and Wu (2014)

Argumentation and psychology
- Larson et al. (2004)

Criticism of existing argumentation theories
- Luque (2011)

Criticism of Luque (2011)
- Andone (2012)
- Xie (2012)

Monological argumentation models
- Bentahar et al. (2010), p. 215

Formal frameworks (logic, defeasibility, evalaution)
- Prakken (2010)
- Hunter (2013)
- Hunter (2014)

Rhetorical considerations from NLP point of view
- Crosswhite et al. (2004)

Look like a textbooks on argumentation
- Freeley and Steinberg (2008)
  * Chapter 8 has examples of Toulmin annotations
- Besnard and Hunter (2008)

Another Toulmin to read
- Toulmin et al. (1984)

Building on RST, classifying discourse relations conveying arguments to
find argument supports
- Villalbda and Saint-Dizier (2012)

Using Dung's framework and Walton's argument schemes together. However
it is unclear how feasible this is.
- Schneider (2012)

Using Walton's schemes for the product reviews domain
- Schneider and Wyner (2012)

General discourse analysis and annotation
- Newman and Marshall (1991)
- Walton (2012)

Extensive overview of argumentation models
- Bentahar et al. (2010)

Study of annotation arguments in long web documents
- Kluge (2014)

Annotating with Toulmin's scheme
- Newman and Marshall (1991)
- Chambliss (1995)
- Simosi (2003)
- Weinberger and Fischer (2006)

## Discussion

- The comparison between claim-premise and Toulmin looks to be OK, but
  I am wondering why they didn't use the same dataset for the clearest
  comparison - given the genres I would expect the claim-premise data
  to be at least a bit easier to annotate than the Toulmin data, as it
  should have more structure and be more formal - user comments should
  be the hardest to annotate; still I think the independent analysis of
  the difficulties with the Toulmin model stands and is valuable
- The modification they made to Toulmin, specifically the backing,
  looked destined to fail to me before I read the results for the very
  reason they cite - it appears too vague a concept to be a part of a
  good argument model, and also to be reliably annotated. However, that
  is a fairly shallow opinion just now, and I'd like to roll up my
  sleeves and do some annotation myself to get a better feel for how
  fair this criticism is.
- One problem with Toulmin is quantifiers and warrants are often not
  explicit. Arguments have to be interpreted and this is part of our
  communication environment - enthymemes abound. Even with a
  claim-premise model annotators have to identify arguments by
  implicitly using warrants they have, or inferring the warrant in use.
  The Toulmin scheme makes this explicit. It is certainly a big problem
  for an annotation task. Though I wonder whether experts could discuss
  and agree on the best most likely implicit warrant in a given context.
  This comes down to a judgment, a complicated one, which is in fact
  likely to vary from person to person depending on their background.
  I wonder how much of the I-A-Disagreement can be explained by this?
- I think it would be a fun dataset - warrant induction
- Another fun thing: if we had a large enough dataset (unlikely, but
  let's just pie in the sky for a moment), then we could use the
  warrants as a natural langauge parameter space (as in Learning with
  Latent Language). Then we could use them to map premises to claims,
  then later use that for argumentation mining. Maybe warrant induction
  can help us overcome the dataset issue.
- Part of my intuition about pragmatics is also about dialogical
  argumentation. Even for an essay the general context (i.e.
  the intended audience) seems important for properly understanding it
  to me. So that could be a research question: find a way to perform a
  critical test of monological versus dialogical argumentation mining.


