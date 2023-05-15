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
Become a root user.
```
sudo -i
```
Start Minikube
```
minikube start --kubernetes-version=v1.22.0 --driver=none
```

Deploy Openfaas

```
arkade install openfaas --basic-auth-password group404 --set=faasIdler.dryRun=false
```


port forwarding for Openfaas
```
kubectl port-forward -n openfaas svc/gateway 8080:8080 --address=0.0.0.0 &
```
In this way, the openfaas functions can be accessed through http://{Host IP}:8080/function/{function name}

 Please use the git clone command to copy the code to the local repository, and then switch to the folder of the local repository.<br>
 Deploy database
```
kubectl apply -f /database.yml
```
Deploy frontend
```
kubectl apply -f /frontend.yml
```
port forwarding for frontend
```
kubectl port-forward -n openfaas-fn svc/frontend-service 80:8080 --address=0.0.0.0 &
```
In this way, the openfaas functions can be accessed through http://{Host IP}

Deploy Openfaas Functions

To retrieve the admin password, run:
```
echo $(kubectl -n openfaas get secret basic-auth -o jsonpath="{.data.basic-auth-password}" | base64 --decode)
```
```
faas-cli login --username admin --password <your password>
cd /backend
faas-cli template store pull python3-http
faas-cli build -f backend.yml
#faas-cli deploy -f backend.yml
```
