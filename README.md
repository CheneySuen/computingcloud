# computingcloud
### Preparation

```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

```
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

```
sudo apt-get update && sudo apt-get install docker.io -y
sudo apt-get install socat -y
sudo apt-get install -y conntrack
curl -sSL https://get.arkade.dev | sudo -E sh
curl -sL https://cli.openfaas.com | sudo sh
```

### Deploy

**全部需要sudo** 

```
minikube start --kubernetes-version=v1.22.0 --driver=none
```

在第一步服务部署完成之后再跑下面指令

```
arkade install openfaas --basic-auth-password group404 --set=faasIdler.dryRun=false
```

跑了第二步之后会报错，找到To retrieve the admin password, run:

echo $(kubectl -n openfaas get secret basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode)，执行命令得到秘钥。

```
kubectl port-forward -n openfaas svc/gateway 8080:8080 --address=0.0.0.0 &
```

放着就行，再开一个Terminal

```
kubectl apply -f ${REPO_HOME}/database.yml
```

```
kubectl apply -f ${REPO_HOME}/frontend.yml
```

```
kubectl port-forward -n openfaas-fn svc/frontend-service 80:8080 --address=0.0.0.0 &
```

放着就行，再开一个Terminal

用秘钥替换group404

```
faas-cli login --username admin --password group404
cd ${REPO_HOME}/backend
faas-cli template store pull python3-http
faas-cli build -f backend.yml
#faas-cli deploy -f backend.yml
```

遇到问题reboot一下instance重新deploy就行

###Frontend
```
cd frontend
sudo apt-get install npm
如果 遇到Error: Cannot find module '@vue/cli-plugin-babel'
npm install babel-plugin-import -D
local run cmd:
npm run-script serve
```
