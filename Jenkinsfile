pipeline {
    agent any
    environment {
        FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
        CHROME_BIN = '/usr/bin/google-chrome'
        CHROMEDRIVER_BIN = '/usr/bin/chromedriver'
    }

    stages {
        stage('Building') {
            steps {
                echo 'Building...'
            }
        } 

        stage('Testing Environment') {
            steps {
                script {
                    echo 'Deploying to Testing Environment...'
                    sh 'firebase deploy -P selenium-testing-testing --token "$FIREBASE_DEPLOY_TOKEN"'
                    
                    echo 'Installing Dependencies...'
                    sh 'npm install selenium-webdriver mocha'
                    
                    echo 'Running Selenium Tests...'
                    sh './node_modules/.bin/mocha test/test1.js'
                    
                    input message: 'After testing, do you want to continue with Staging Environment? (Click "Proceed" to continue)'
                }
            }
        } 

        stage('Staging Environment') {
            steps {
                echo 'Deploying to Staging Environment...'
                sh 'firebase deploy -P selenium-testing-staging --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 

        stage('Production Environment') {
            steps {
                echo 'Deploying to Production Environment...'
                sh 'firebase deploy -P selenium-testing-production --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
    }
}
