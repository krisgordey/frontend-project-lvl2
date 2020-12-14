![Node CI](https://github.com/krisgordey/frontend-project-lvl2/workflows/Node%20CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c3dd1f492d0fa2f8962/maintainability)](https://codeclimate.com/github/krisgordey/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2c3dd1f492d0fa2f8962/test_coverage)](https://codeclimate.com/github/krisgordey/frontend-project-lvl2/test_coverage)

# GenDiff

### Description
CLI app, which compares two configurations files and shows a difference.
The utility supports the following file extensions for comparison:

- JSON
- yaml

Also gendiff utility supports following output formats:

- JSON
- stylish
- plain
---
### Installation

Node.JS (version 14.0 or higher) required. To install this utility, you need to clone this repository to your machine using the following console command:

```python
git clone https://github.com/krisgordey/frontend-project-lvl2
```

Then you should go to utility directory (where you clone it) on your machine and use command:
```python
make install
```
---
### Usage

The command syntax is:
```python
gendiff [options] <filepath1> <filepath2>
```
Options:
- -V, --version - output the version number
- -f, --format - output format (stylish, plain, JSON). Default output format is stylish
- -h, --help - output usage infromation

### Examples


gendiff in stylish format:
```python
gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json -f stylish
```

[![asciicast](https://asciinema.org/a/vxQomd5dMBczSCyFwCCgycTTL.svg)](https://asciinema.org/a/vxQomd5dMBczSCyFwCCgycTTL)

gendiff in plain format:
```python
gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json -f plain
```

[![asciicast](https://asciinema.org/a/pW7ZC0WSPsU8qstKKLC0XGhxE.svg)](https://asciinema.org/a/pW7ZC0WSPsU8qstKKLC0XGhxE)

gendiff in json format:
```python
gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json -f json
```

[![asciicast](https://asciinema.org/a/KjXTSWmbX02KLWBhITLocgh3Y.svg)](https://asciinema.org/a/KjXTSWmbX02KLWBhITLocgh3Y)
