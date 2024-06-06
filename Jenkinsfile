pipeline{
    agent any
    environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    }

 stages{
        stage('Building'){
            steps{
           
                echo 'Biulding...'
            }
        } 
        stage('Testing Environment'){
            steps{
            sh 'firebase deploy -P selenium-testing-testing --token "$FIREBASE_DEPLOY_TOKEN"' 
            input message: 'After testing. Do you want to continue with Staging Environment? (Click "Proceed" to continue)'
            }
        } 
        stage('Staging Environment'){
            steps{
              sh 'firebase deploy -P selenium-testing-staging --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
        stage('Production Environment'){
            steps{
             sh 'firebase deploy -P selenium-testing-production --token "$FIREBASE_DEPLOY_TOKEN"'
            }
        } 
    }

}
