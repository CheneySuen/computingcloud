# CSIT6000o Project
### Group 5
| Name    | Student ID |Email Address| Contribution|
| ----------- | ----------- | ----------- | ----------- |
| JIN, Jinglan      | 20880872       | jjinam@connect.ust.hk       |       |
| LIU, Songshang   |20879938        |sliudm@connect.ust.hk       |       |
| SHU, Xinyue      | 20880547       | xshuac@connect.ust.hk       |       |
|SUN, Yichen  |20879782        |ysundu@connect.ust.hk       |       |
### Serverless Shopping Cart
For our group project, we re-implemented the AWS Serverless Shopping Cart project, and have made replacement of the internal components, including the DynamoDB to MongoDB, and AWS Lambda to OpenFaaS. Besides, we also used the Docker container technology to implement the serverless application deployment, allowing the application to run on different environments with Kubernetes cluster. We also implemented a frontend UI with Vue to visualize the application. The application supports shopping cart functions including add products into the shopping cart, removing products from shopping cart, viewing products in shopping cart and reading information about shopping cart. 
![overview](/overview.jpg)
### Environment Setup
This project needs to be setup in AWS. We choose Ubuntu Server 22.04 LTS (HVM), SSD Volume Type as AMI (Amazon Machine Image) and m5.large as the instance type. And We configure security group as followed.
| Type			    | Protocol |Port Range| Source|
| ----------- | ----------- | ----------- | ----------- |
| All traffic				     | All       | All     |     0.0.0.0/0  |
### Preparation
Run the following commands to satisfy the requirements.
```
# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
# Install Docker
sudo apt-get update && sudo apt-get install docker.io -y
# Install socat
sudo apt-get install socat -y
# Install conntrack
sudo apt-get install -y conntrack
# Install arkade
curl -sSL https://get.arkade.dev | sudo -E sh
# Install openfaas
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

### Frontend
```
cd frontend
sudo apt-get install npm
如果 遇到Error: Cannot find module '@vue/cli-plugin-babel'
npm install babel-plugin-import -D
local run cmd:
npm run-script serve
```
