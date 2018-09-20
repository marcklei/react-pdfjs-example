pipeline {
  agent {
    docker {
      image 'node'
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