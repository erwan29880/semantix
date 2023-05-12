# Sémantix 

Cette application web est très proche du jeu Cémentix disponible à cette adresse : https://cemantix.herokuapp.com/ . Cette application n'a pas la vocation de la remplacer, je l'ai développée afin de me familiariser avec l'algorithme Word2vec. 

Le modèle utilisé ici a été entraîné par Jean-Philippe Fauconnier, et est disponible sur son github : https://fauconnier.github.io/#data . Il propose plusieurs modèles, j'ai choisi le modèle frWiki_no_phrase_no_postag_1000_skip_cut200.bin, entraîné sur le corpus wikipédia en français avec mots lemmatisés. 

Le modèle fait des associations sémantiques simples, la bibliothèque Gensim fournit des utilitaires afin de trouver les mots les plus similaires. 

Pour lancer l'application : 

> docker-compose up -d --build 

Pour jouer, aller sur cette page : 

> http://localhost:6234/  

Pour tester le fonctionnement avec pytest : 

> docker exec -it semantix bash 

> pytest test.py