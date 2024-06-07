pipeline {
    agent any
    environment {
        FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
        
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
                   def output = sh(script: './node_modules/.bin/mocha test/test1.js', returnStdout: true).trim()

                   //Debugging printing the output
                   echo "Test Output: ${output}"

                   //write the result to a file
                   if(output.contains('test Success')){
                    writeFile file: env.TEST_RESULT_FILE, text: 'true'
                   }else{
                    writeFile file: env.TEST_RESULT_FILE, text: 'false'
                   } catch (Exception e){
                    echo "Test failed: ${e.message}"
                    writeFile file: env.TEST_RESULT_FILE, text: 'false'
                   }
                    }
                }
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
    

