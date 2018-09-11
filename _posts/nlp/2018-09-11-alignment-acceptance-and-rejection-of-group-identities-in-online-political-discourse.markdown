---
layout: post
title: "[Paper] Alignment, Acceptance, and Rejection of Group Identities in Online Political Discourse"
date: 2018-09-11
categories: nlp papers
---

[Shin and Doyle NAACL 2018](http://aclweb.org/anthology/N18-4001)

## Key Findings

- Alignment (measured by pronouns) is strongly biased toward cooperative
  alignment, but different linguistic features can show substantially different
  behaviours
- Whilst previous work find alignment always positive and a matter of degree,
  the authors found negative alignment
- Negative pronoun alignment contrasts with relatively stable alignment of
  word categories associated with possible rhetorical approaches, suggesting in
  their dataset group dynamics are more contentious than the argument itself -
  strong group identities can overcome the general desire to align

## Background and Related Work

Work in Communication Accommodation Theory, that demonstrated speakers tend to
align to achieve social approval from in-group members, and diverge with
out-groups, especially when relations are strained
- Giles et al. (1991, 1993)

Specific studies of alignment from speed dates to legal courts
- Danescu-Niculescu-Mizil et al. (2011)
- Guo et al. (2015)
- Ireland et al. (2011)
- Niederhoffer and Pennebaker (2002)

The alignment model the authors adapt called WHAM
- Doyle and Frank (2016)

Study of accommodation
- Giles et al. (1991)

Accommodation from looking at usage of function work categories such as
pronouns, prepositions, and articles - an approach arguing that function words
provide the syntactic structure which can vary somewhat independently of the
content words being used, thereby allowing individuals to express their own
personality and identity
- Danescu-Niculescu-Mizil et al. (2011)
- Niederhoffer and Pennebaker (2002)
- Chung and Pennebaker (2007)

Accommodation focusing on convergence in lexical categories is what the authors
call **linguistic alignment**, and is related to the concepts of
- **priming**: exposure to one stimulus influences response to a subsequent
  stimulus - e.g. "nurse" brings up medical and hospital associations/context
- **entraining**: the phenomenon of adapting the reference terms of one's
  interlocutor to ensure clarity of reference and communication, necessary to
  overcome the ambiguity in the multitude of synonyms that exist in the language

Separating **homophily** (an inherent similarity between language users) from
alignment (a necessary factorization to get the kinds of analysis we want going)
- Danescu-Niculescu-Mizil et al. (2011)
- Doyle et al. (2017) (estimating employees inclusion in the workplace)

Alignment for argumentation
- Burleson and Fennelly (1981)
- Duran and Fusaroli (2017)
- Pickering and Garrod (2004)
- Giles et al. (1991)

Key sentence for me:
"if function word usage can reflect a speaker's psychological state then
negative alignment to opponents would be observed as a fair representation of
the disagreement between speakers."
Using this idea to detect agreement/disagreement between speakers
- Rosenthal and McKeown (2015)

Word categories that represent different rhetorical approaches to argument
- Pennebaker et al. (2003)

Work on pronouns indicating group dynamics
- Van Swol and Carlson (2017)

Work on different word usage for different groups
- Schwartz et al. (2013)

Linguistic Inquiry and Word Count, seems to be about psychological states being
reflected in counts of works in psychologically relevant categories - may be of
use in argumentation mining, worth at least checking, especially given:
"A speaker's baseline usage of rhetorical categories will present the
group-specific speech styles that may be dependent on group identity, reflecting
preferred styles of argument. The degree of alignment on rhetorical categories
indicates whether speakers maintain their group's discussion style or adapt to
the other group."
- Pennebaker et al. (2007)

Usage of "they" among out-group members may reflect a common referent and not a
lack of alignment - compare "you"
- Clark (1996)

Alignment due to non-social factors (i.e. cognitive, I think)
- Pickering and Garrod (2004)

## SWAM Model

Define
- **baseline word use**: the rate at which someone uses a given word category
  $$W$$ when it has not been used in the preceding message. This reflects
  internalization of in-group identity, homophily, and enculturation.
- **alignment**: the relative increase in the probability of words from $$W$$
  being used when the preceding message used a word from $$W$$. This reflects
  a willingness to adjust one's own behaviour to fit another's expectations and
  framing.

Infer two parameters in logit-space, conditioned on a hierarchy of Gaussian
priors: the baseline

$$\eta_{\text{base}} = \log p(B|\text{not} A)$$

and alignment values

$$\eta_{\text{align}} = \log \frac{p(B|A)}{p(B|\text{not} A}$$

The conditional probabilities express the likelihood of a word category being
used if the previous message does or does not contain that category.

Noted differences with WHAM (Doyle and Frank (2016))
- WHAM uses a hierarchy of Gaussians to tie together observations from related
  messages to improve robustness when data is sparse or sociological factors
  are subtle - whilst requiring statistical assumptions it improves robustness
  when group dynamics are subtle or group membership difficult to determine
- But when group membership is clear this may provide inaccurate estimates
- The hierarchy in WHAM aggregates information across groups to improve
  alignment estimates, but one group's alignment may not be predictive of
  another's when the groups are opposed
- Hence the Simplified Word-Based Alignment Model (SWAM) for cases where groups
  are expected to provide clear signal

Noted differences with subtractive alignment model of Danescu-Niculescu-Mizil
et al. (2011):
- SWAM uses a conditioned baseline $$p(B|\text{not} A)$$ whereas they use the
  unconditioned $$p(B)$$
- SWAM places alignment on log-odds rather than probability which avoids floor
  effects for alignment of rare word categories
- SWAM calculates alignment per word, not per message, which controls for
  message length

## On Rhetorical Categories

The categories seem to come from Pennebaker (2007).

The cognitive processes category "spans markers of certainty, discrepancy, and
inclusion, and has been argued to reflect argumentation framing that appeals to
rationality." I would like to find those arguments.

"Elevated causation word usage has been argued to be employed by the minority
position within a debate, to provide convincing evidence against the status quo
(Pennebaker et al. (2003), Van Swol and Carlson (2017)).

Note also that perceived power differences influence alignment - the previous
point can be seen as a specific case of this.

It seems to be an issue for the authors, in the discussion, that alignment was
not observed for the rhetorical categories, and setps to further investigate
are proposed (see below).

## Discussion

### Function Words (Author's Discussion)

The theory upon which this work is based holds that pronouns and some rhetorical
words can be classed as function words. However, this may not necessarily be
such a clean classification. They say that using some alignment words are
inevitable to stay in the conversation, or as an unambiguous referent.

Therefore as future work the authors suggest to separate alignment motivated by
active acceptance from alignment that must occur in order to stay in the
conversation.

The authors mention a strategy: separate the dataset into specific conversations
and calculate alignment within those. The lexical coherence within conversations
should thereby control for this effect.

### Does the conditioned baseline make sense?

On the one hand $$p(B)$$ seems suboptimal because it confounds alignment in its
probability - every instance of alignment usage of a word category will also
count towards this probability. This would seem to erroneously inflate the
baseline probability value.

On the other hand, instances of a word category that I would otherwise have
used, not necessarily reflecting alignment, will be dropped from the statistic
if it accidentally happens that the previous message contains it. This would
threaten to erroneously lower the baseline probability.

If I had to choose one I would choose conditioned. By only counting instances
where we are sure word usage does not occur from alignment we would seem to get
a cleaner signal than not doing that.

Is there a better solution?

(The authors do note as future work to look at a larger dataset to compare with
WHAM in order to make sure their model estimates are accurate.)

### Argument Idenfitication

Can we use alignment calculations to identify when arguments are occuring? To
identify support and attack generally?

Or is it more useful for the pragmatic signal - to try and identify groups or
clusters that are the secondarily useful for argument identification?

### Bad Argument Identification

The authors' find that strong pronoun alignment and weak alignment of
rhetorical categories reflecting a situation where group membership and dynamics
means more than the issues at hand. In such a situation one would expect to find
a preponderance of bad arguments - non-sequiturs, questionable warrants, logical
fallacies, etc.

In argumentation mining terms, it could be a place where the pragmatic and
contextual signal is just as important as, or more important than, e.g., using
warrants to try and make the connections between premises and conclusions, and
certainly identifying what the claims are.

This paper suggests that we can calculate the ratio of pronoun alignment over
rhetorical category alignment to identify cases where pragmatics are more
important and where argumentation is likely to be of poorer quality.

A hypothesis I have been mulling over is that pragmatic signal is essential for
high precision argumentation mining. This follows directly from my own
experience: at times I struggle to understand a (bad) argument and only after I
take a guess at the stance of the person can I make sense of it. It would be
interesting to gather examples of such cases and analyze them - even turn them
into a challenging dataset.

It would be nice to take a dump from The Conversation and annotate it much like
the persuasive essay corpus, only with the added pragmatic signal. That way we
could perform a direct comparison with and without this additional signal.
