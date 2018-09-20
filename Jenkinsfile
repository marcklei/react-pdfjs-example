pipeline {
  agent {
    node {
      label 'node-pipeline'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'yarn'
      }
    }
    stage('test') {
      steps {
        sh 'yarn test'
      }
    }
  }
}