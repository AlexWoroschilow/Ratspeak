FROM ubuntu:22.04

RUN apt-get update && apt-get install -y
RUN apt install -y libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \ 
  pkg-config libudev-dev libasound2-dev libpcsclite-dev \
  git

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y 
ENV PATH="/root/.cargo/bin:${PATH}"
RUN rustup update

RUN cargo install tauri-cli --version "^2.0.0" --locked

RUN mkdir /srv/ratspeak-src
RUN cd /srv/ratspeak-src && \
  git clone https://github.com/ratspeak/rsReticulum && \
  git clone https://github.com/ratspeak/rsLXMF && \
  git clone https://github.com/ratspeak/lrgp-rs && \
  git clone https://github.com/ratspeak/rsLXST

RUN apt-get update && apt-get install -y \
    libwayland-client0 \
    libwayland-egl1 \
    libwayland-cursor0 \
    && rm -rf /var/lib/apt/lists/*  
