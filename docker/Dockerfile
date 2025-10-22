FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-22.04

USER vscode

# install minimum set of tooling
RUN sudo apt-get update \
  && sudo apt-get install -y --no-install-recommends \
  vim bat jq make wget curl bash-completion \
  iputils-ping nmap dnsutils traceroute 

# install yq
RUN sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 \
  && sudo chmod a+x /usr/local/bin/yq

# avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# install node and npm
RUN sudo mkdir -p /etc/apt/keyrings && \
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
  NODE_MAJOR=22 && \
  sudo echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list && \
  sudo apt-get update && \
  sudo apt-get install -y nodejs 

# remove zsh, due to everything is configured for bash
RUN sudo apt remove zsh -y

# some curl and bash candy
RUN echo '-w "\\n"' | sudo tee -a /root/.curlrc \
  && echo 'alias cat=batcat' | sudo tee -a /root/.bashrc \
  && echo 'source /etc/bash_completion' | sudo tee -a /root/.bashrc \
  && echo 'PS1="\[\033[0;32m\]\u@\H \[\033[0;34m\]\w >\e[0m "' | sudo tee -a /root/.bashrc

# cleanup
RUN sudo apt autoremove -y \
  && sudo rm -rf /var/lib/apt/lists/*
