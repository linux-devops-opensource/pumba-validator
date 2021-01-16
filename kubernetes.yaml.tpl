apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app.kubernetes.io/component: validator
    app.kubernetes.io/name: pumba-validator
    app.kubernetes.io/part-of: pumba
  name: pumba-validator
  namespace: pumba
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: pumba-validator
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app.kubernetes.io/name: pumba-validator
    spec:
      containers:
      - image: gcr.io/GOOGLE_CLOUD_PROJECT/pumba-validator:COMMIT_SHA
        name: pumba-validator
        ports:
        - containerPort: 5000
          protocol: TCP
        resources:
          requests:
              memory: "50Mi"
              cpu: "50m"
          limits:
              memory: "250Mi"
              cpu: "250m"