pipeline {
    agent any

    tools { nodejs "Node" }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Validate Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Running Tests') {
            steps {
                sh 'npm run test:coverage'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'coverage/', followSymlinks: false
        }
    }
}
