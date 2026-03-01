---
title: "Transformer + Keras + Tensorflow + CUDA 環境設置"
description: "由於各個版本會衝突，導致許多時候環境的設置會讓版本失效。"
pubDate: "2024-12-23"
category: "Uncategorized"
tags: []
---

由於各個版本會衝突，導致許多時候環境的設置會讓版本失效。

本篇僅提供參考，由版主的機器為主。 

目前為止 Transformer 不支援 Keras 3.0 以上，另外Python 的版本過新會導致許多package會出錯。

Python 使用 3.10.16 。

使用Anaconda 作為虛擬環境。 

先安裝 Transformer 
    
    
    conda install conda-forge::transformers
    pip install transformers[torch]
    pip install tensorflow[and-cuda]    
    
    然後安裝 keras -> 2.10.0 版本
    pip install keras==2.10.0
    [
    參考這篇文章，安裝CUDA版本 ](<https://ithelp.ithome.com.tw/m/articles/10322104>)
    
    
    pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117

安裝正常可以運作的版本的 package list

(transformer) C:\Users\USER>pip list  
Package Version

* * *

absl-py 2.1.0  
accelerate 1.2.1  
aiohappyeyeballs 2.4.4  
aiohttp 3.11.10  
aiosignal 1.2.0  
anyio 4.6.2  
argon2-cffi 21.3.0  
argon2-cffi-bindings 21.2.0  
asttokens 2.0.5  
astunparse 1.6.3  
async-lru 2.0.4  
async-timeout 5.0.1  
attrs 24.3.0  
Babel 2.11.0  
beautifulsoup4 4.12.3  
bleach 6.2.0  
Bottleneck 1.4.2  
Brotli 1.0.9  
cachetools 5.5.0  
certifi 2024.12.14  
cffi 1.17.1  
charset-normalizer 3.3.2  
colorama 0.4.6  
comm 0.2.1  
datasets 2.19.1  
debugpy 1.6.7  
decorator 5.1.1  
defusedxml 0.7.1  
dill 0.3.8  
dm-tree 0.1.8  
exceptiongroup 1.2.0  
executing 0.8.3  
fastjsonschema 2.20.0  
filelock 3.13.1  
flatbuffers 24.3.25  
frozenlist 1.5.0  
fsspec 2024.3.1  
gast 0.4.0  
google-auth 2.37.0  
google-auth-oauthlib 0.4.6  
google-pasta 0.2.0  
grpcio 1.68.1  
h11 0.14.0  
h5py 3.12.1  
httpcore 1.0.2  
httpx 0.27.0  
huggingface_hub 0.24.6  
idna 3.7  
ipykernel 6.29.5  
ipython 8.30.0  
jedi 0.19.2  
Jinja2 3.1.4  
json5 0.9.25  
jsonschema 4.23.0  
jsonschema-specifications 2023.7.1  
jupyter_client 8.6.0  
jupyter_core 5.7.2  
jupyter-events 0.10.0  
jupyter-lsp 2.2.0  
jupyter_server 2.14.1  
jupyter_server_terminals 0.4.4  
jupyterlab 4.2.5  
jupyterlab-pygments 0.1.2  
jupyterlab_server 2.27.3  
keras 2.10.0  
keras-core 0.1.7  
keras-nlp 0.6.4  
Keras-Preprocessing 1.1.2  
libclang 18.1.1  
Markdown 3.7  
MarkupSafe 2.1.3  
matplotlib-inline 0.1.6  
mistune 2.0.4  
mkl_fft 1.3.11  
mkl_random 1.2.8  
mkl-service 2.4.0  
mpmath 1.3.0  
multidict 6.1.0  
multiprocess 0.70.15  
nbclient 0.8.0  
nbconvert 7.16.4  
nbformat 5.10.4  
nest-asyncio 1.6.0  
networkx 3.4.2  
notebook 7.2.2  
notebook_shim 0.2.3  
numexpr 2.10.1  
numpy 1.26.4  
oauthlib 3.2.2  
opt_einsum 3.4.0  
overrides 7.4.0  
packaging 24.2  
pandas 2.2.3  
pandocfilters 1.5.0  
parso 0.8.4  
pillow 10.2.0  
pip 24.2  
platformdirs 3.10.0  
prometheus_client 0.21.0  
prompt-toolkit 3.0.43  
propcache 0.2.0  
protobuf 3.19.6  
psutil 5.9.0  
pure-eval 0.2.2  
pyarrow 17.0.0  
pyasn1 0.6.1  
pyasn1_modules 0.4.1  
pycparser 2.21  
Pygments 2.15.1  
PySocks 1.7.1  
python-dateutil 2.9.0.post0  
python-json-logger 3.2.1  
pytz 2024.1  
pywin32 305.1  
pywinpty 2.0.14  
PyYAML 6.0.2  
pyzmq 26.2.0  
referencing 0.30.2  
regex 2024.9.11  
requests 2.32.3  
requests-oauthlib 2.0.0  
rfc3339-validator 0.1.4  
rfc3986-validator 0.1.1  
rpds-py 0.10.6  
rsa 4.9  
safetensors 0.4.5  
Send2Trash 1.8.2  
sentencepiece 0.2.0  
setuptools 75.1.0  
six 1.16.0  
sniffio 1.3.0  
soupsieve 2.5  
stack-data 0.2.0  
sympy 1.13.1  
tensorboard 2.10.1  
tensorboard-data-server 0.6.1  
tensorboard-plugin-wit 1.8.1  
tensorflow 2.10.1  
tensorflow-estimator 2.10.0  
tensorflow-intel 2.14.1  
tensorflow-io-gcs-filesystem 0.31.0  
termcolor 2.5.0  
terminado 0.17.1  
tinycss2 1.2.1  
tokenizers 0.21.0  
tomli 2.0.1  
torch 2.5.1+cu124  
torchaudio 2.5.1+cu124  
torchvision 0.20.1+cu124  
tornado 6.4.2  
tqdm 4.66.5  
traitlets 5.14.3  
transformers 4.47.1  
typing_extensions 4.12.2  
tzdata 2023.3  
urllib3 2.2.3  
wcwidth 0.2.5  
webencodings 0.5.1  
websocket-client 1.8.0  
Werkzeug 3.1.3  
wheel 0.44.0  
win-inet-pton 1.1.0  
wrapt 1.17.0  
xxhash 2.0.2  
yarl 1.18.0
