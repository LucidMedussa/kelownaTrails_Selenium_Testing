pipeline {
  agent any
  environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    TEST_RESULT_FILE = 'test_result.txt'
  }  
  stages{
    stage('Building'){
        steps{
            echo 'Building'
        }
    }
    stage('Testing'){
        steps{
            sh 'firebase deploy -P devops-proj-testing --token "$FIREBASE_DEPLOY_TOKEN"' 
            script{
                try{
                    //Install Selenium webdriver
                    sh 'npm install selenium-webdriver mocha'
                    
                   
                    
                    //Run the test and capture the output
                    def output = sh(script: './node_modules/.bin/mocha test/test1.js', returnStdout: true).trim()

                    //Debugging printing the output
                    echo "Test Output: ${output}"

                    //Write the result to a file

                    if(output.contains('Test Success')){
                        writeFile file: env.TEST_RESULT_FILE, text: 'true'
                    }else{
                        writeFile file: env.TEST_RESULT_FILE, text: 'false'
                    }
                }catch (Exception e) {
                    echo "Test failed: ${e.message}"
                    writeFile file: env.TEST_RESULT_FILE, text: 'false'
                }
            }
            

        }
    }
    stage('Staging'){
        when{
               expression {
                 // Read the test result from the file id true continue
                def testResult = readFile(env.TEST_RESULT_FILE).trim()
                return testResult == 'true'
                }           
             }
        steps{
          sh 'firebase deploy -P devops-proj-staging --token "$FIREBASE_DEPLOY_TOKEN"'
        }
    }
    stage('Production'){
        steps{
               sh 'firebase deploy -P devops-proj-production-bcfd9 --token "$FIREBASE_DEPLOY_TOKEN"'
        }
    }
  }
}