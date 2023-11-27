#!/bin/bash

python3.9 -m pip install -r PaddleOCR/requirements.txt
python3.9 -m pip install -r requirements.txt

cd PaddleOCR || exit
mkdir -p inference/cls inference/det inference/reg
cd inference/det || exit
wget https://paddleocr.bj.bcebos.com/PP-OCRv3/english/en_PP-OCRv3_det_infer.tar
tar xvf en_PP-OCRv3_det_infer.tar && rm *.tar
cd ../cls || exit
wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_cls_infer.tar
tar xvf ch_ppocr_mobile_v2.0_cls_infer.tar && rm *.tar
cd ../reg || exit
wget https://paddleocr.bj.bcebos.com/PP-OCRv3/english/en_PP-OCRv3_rec_infer.tar
tar xvf en_PP-OCRv3_rec_infer.tar && rm *.tar