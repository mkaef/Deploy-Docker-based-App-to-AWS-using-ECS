
# Docker-based App Deplyment to AWS using ECS

In this project, we will deploy a Docker-based application to AWS using Elastic Container Service. First we will create a javaScript code, dockerize the Dockerfile and run the app locally to ensure that the application works properly prior to AWS Deployment. Then we will connect to AWS and  repeat the same process and deploy the application to AWS using ECS.


Prerequisites.

    1. VSCode (Text Editor).
    2. Docker install on your local host.
    3. AWS CLI installed.
    4. A personal AWS account.


## Deployment

Local Deployment:

Create an express application using JavaScript (index.js), a JSON package (package.json) that includes depencies that the app needs, create a Dockerfile and dockerize the application.

Build the image.
```bash
$ docker build -t express-app .
$ docker images
```
Let run the container.
```bash
$ docker run -p <local-machine-port>:<local-host-container> <ImageID>
$ docker run -p 6565:5000 3b249f4e3d55
```

AWS Deployment

First, we will connect to amazone Web Servie using our credentials, then we will create a cloud repository on ECR console, upload the Docker image to the repository, create our Cluster on ECS, create task definitios, deploy the created task and finally test the URL.

Let connect to AWS.
```bash
$ aws configure
AWS Access Key ID [****************NMC4]: YOUR ACCESS KEY ID
AWS Secret Access Key [****************DScZ]: YOUR ACCESS KEY
Default region name [US East (N. Virginia) us-east-1]:
Default output format [us-east-1US East (N. Virginia) us.east-1]:
```
Create a repository on ECR and push our image previously build locally.
```bash
$ aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR ID.dkr.ecr.us-east-1.amazonaws.com
$ docker build -t myexpressapprepo . 
$ docker tag myexpressapprepo:latest YOUR ID.dkr.ecr.us-east-1.amazonaws.com/myexpressapprepo:latest
$ docker push YOUR ID.dkr.ecr.us-east-1.amazonaws.com/myexpressapprepo:latest
```
Let create our ECS Cluster.

    1. Click on create cluster button and select EC2 Linux + Networking.
    2. On the next page, insert the create name.
    3. Set Provisioning Model as On-Demand Instance.
    4. EC2 Instance type, select t2a.micro.
    5. Set the VPC to the default VPC.
    6. Set the Subnets.
    7. Set the Auto-assign public IP to Enabled.
    8. Use security group as the default value.
    9. Click on create.

Create task definitions and deploy insert.

    1. Create task definition, select EC2 and enter the task name.
    2. Fill details and click add container.
    3. Enter the container name and its imane URL.
    4. Enter the Host and Container port numbers.
    5. click clusters and select the created cluster.
    6. Select run a new task, and selct EC2 as launch type.
    7. Select the task created and enter the name of the cluster created.

Let test the URL.

    1. In EC2 instances, select security group as default.
    2. Edit and and inbound rules.
    3. Select TCP and enter local host port number for port range, and use 0.0.0.0/0 for source info.
    4. Copy the public DNS URL of the selected instance, paste it into the tab of a browser on your local host port number.

![ECR Cluster](https://user-images.githubusercontent.com/20161437/235326429-1fd076de-2c71-43b5-8bff-0b773e4e08ba.png)
