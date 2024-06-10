pipeline {
  agent any
  environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    TEST_RESULT_FILE = 'test_result.txt'
  }  
  stages{
    stage('Building'){
        steps {
                sh 'python3 -m pip install selenium'
                sh 'python3 -m pip install --upgrade urllib3==1.26.7'
                sh 'python3 -m pip install selenium'
                sh 'python3 -m pip install pytest'
            }
    }
    stage('Testing'){
        steps{
            echo 'Testing'
            sh 'firebase deploy -P selenium-testing-testing --token "$FIREBASE_DEPLOY_TOKEN"' 
            script{
                try{                    
                    //Run the test and capture the output
                    def output = sh(script: 'pytest -v test', returnStdout: true).trim()

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
          sh 'firebase deploy -P selenium-testing-staging --token "$FIREBASE_DEPLOY_TOKEN"'
        }
    }
    stage('Production'){
        when{
               expression {
                 // Read the test result from the file id true continue
                def testResult = readFile(env.TEST_RESULT_FILE).trim()
                return testResult == 'true'
                }           
             }
        steps{
               sh 'firebase deploy -P selenium-testing-production --token "$FIREBASE_DEPLOY_TOKEN"'
        }
    }
  }
}