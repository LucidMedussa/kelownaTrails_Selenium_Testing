pipeline {
  agent any
  environment {
    FIREBASE_DEPLOY_TOKEN = credentials('firebase-token')
    TEST_RESULT_FILE = 'test_result.txt'
  }  
  stages {
    stage('Building') {
      steps {
        echo 'Building'
      }
    }
    stage('Testing') {
      steps {
        script {
          try {
            // Install Selenium webdriver
            sh 'npm install selenium-webdriver'

            // Run the test and capture the output
            def output = sh(script: './node test/test1.js', returnStdout: true).trim()

            // Debugging printing the output
            echo "Test Output: ${output}"

            // Write the result to a file
            writeFile file: env.TEST_RESULT_FILE, text: output
          } catch (Exception e) {
            echo "Test failed: ${e.message}"
            writeFile file: env.TEST_RESULT_FILE, text: 'false'
          }
        }
      }
    }
    stage('Staging') {
      when {
        expression {
          // Read the test result from the file and deploy to staging only if successful
          def testResult = readFile(env.TEST_RESULT_FILE).trim()
          return testResult.contains('Test Success')
        }
      }
      steps {
        sh 'firebase deploy -P selenium-testing-staging --token "$FIREBASE_DEPLOY_TOKEN"'
      }
    }
    stage('Production') {
      steps {
        sh 'firebase deploy -P selenium-testing-production --token "$FIREBASE_DEPLOY_TOKEN"'
      }
    }
  }
}
