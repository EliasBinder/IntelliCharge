FROM python:3.11-bullseye
COPY . /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    wget \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN python3 -m pip install -r PaddleOCR/requirements.txt
RUN python3 -m pip install -r requirements.txt

WORKDIR /app/PaddleOCR
RUN mkdir -p inference/cls inference/det inference/reg
WORKDIR /app/PaddleOCR/inference/det
RUN wget https://paddleocr.bj.bcebos.com/PP-OCRv3/english/en_PP-OCRv3_det_infer.tar
RUN tar xvf en_PP-OCRv3_det_infer.tar && rm *.tar
WORKDIR /app/PaddleOCR/inference/cls
RUN wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_cls_infer.tar
RUN tar xvf ch_ppocr_mobile_v2.0_cls_infer.tar && rm *.tar
WORKDIR /app/PaddleOCR/inference/reg
RUN wget https://paddleocr.bj.bcebos.com/PP-OCRv3/english/en_PP-OCRv3_rec_infer.tar
RUN tar xvf en_PP-OCRv3_rec_infer.tar && rm *.tar

WORKDIR /app

CMD ["python3", "main.py"]
