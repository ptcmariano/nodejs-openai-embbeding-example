# nodejs-openai-embedding-example

 > example using opeanai nodejs package, like tutorial web questions and answers about your website

 > tutorial in python: https://platform.openai.com/docs/tutorials/web-qa-embeddings

## steps to prepare

 * [x] webcrawler
 * [x] store index to embeddings
 * [x] create context
 * [x] run questions

## run scripts

 > step1

 ``npm run webcrawler``

 > step2

 ```
 python -m venv env

 env\Scripts\activate.bat

 pip install -r requirements.txt

 python step2-text-to-csv.py
 ```

 > step3

 ```
 echo <API_KEY> > env\apikey

 python step3-tokenization.py
 ```

 > step4

 ```
 # create question and change on functions call

 python step4-run-question-with-context.py
 ```

## contribute

 feel free to contribute to the project, add a issue or pull request :]
