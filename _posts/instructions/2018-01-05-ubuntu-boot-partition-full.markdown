---
layout: post
title: "Ubuntu 16.04 Boot Partition Full"
date: 2018-01-04
categories: ubuntu
---

A system error is raised in the desktop environment, and it also shows
up when trying to install a new package. Not all packages it seems. I am
not sure the conditions for package installation to throw this error -
missing dependencies?

I happened to ignore the desktop warning at the time because I was busy.
It was when I couldn't install a required package that I was forced to
address it.

Since the package was missing dependencies I needed to run:

{% highlight bash %}
sudo apt-get install -f
{% endhighlight %}

But this also threw the same error: boot partition full.

There is a command to cleanup the boot drive by uninstalling old linux
kernels that will leave the current kernel and one previous as a fallback:

{% highlight bash %}
sudo apt-get autoremove
{% endhighlight %}

However I could not even run this command due to the error.

I therefore had to resort to a manual deletion of some old kernels to
free up some space in order to get the above commands to work.

Check out the status of the boot partition

{% highlight bash %}
df -h /boot
{% endhighlight %}

Get the current kernel version number

{% highlight bash %}
uname -r
{% endhighlight %}

Get a list of files in /boot that will tell us the version numbers of
the kernels we can safely delete

{% highlight bash %}
ls /boot
{% endhighlight %}

We can delete kernels with the command

{% highlight bash %}
sudo dpkg --force-all -P linux-image-x.x.x-x-generic
{% endhighlight %}

After cleaning up a number of these and halving the space used on the
boot partition, I was then able to run

{% highlight bash %}
sudo apt-get install -f
{% endhighlight %}

to fix the missing dependencies. This led to the boot partition being
full again! I then ran

{% highlight bash %}
sudo apt-get autoremove
{% endhighlight %}

to remove unnecessary packages. The boot partition was then about half
full.

I could then install my package successfully.
