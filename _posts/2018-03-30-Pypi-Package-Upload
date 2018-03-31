---
layout: post
title: "Pypi Package Upload"
date: 2018-03-30
categories: pypi
---

#First Time

Make sure .pypirc is in the home folder. Mine currently looks like:

```[distutils]
index-servers=pypi

[pypi]
username=***
password=***
```

Add `setup.py` to the root folder. Might look like:

```python
from setuptools import setup, find_packages

setup(
    name='***',
    packages=find_packages(exclude=['***']),
    version='***',
    description='***',
    author='***',
    author_email='***',
    url='***',
    download_url='***',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
    ],
    keywords='***',
    install_requires=[
        '***',
    ]
)
```

Add `setup.cfg` (apparently necessary if you have a `README.md` in markdown)

```
[metadata]
description-file = README.md
```

Make sure everything is committed to Git, and then create a tag

```
git tag *** -m "***"
git push --tags origin master
```

Execute the command

```
python setup.py sdist upload -r pypi
```

# Updating

- Update `setup.py` with new version info and tag info
- Commit everything to Git
- Create new tag
- Execute `python setup.py sdist upload -r pypi`
