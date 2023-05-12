import numpy as np
import random
from gensim.models import KeyedVectors


class Semantix: 
    
    def __init__(self, mot:str = "test") -> None:
        self.path = "frWiki_no_phrase_no_postag_1000_skip_cut200.bin"
        self.model = KeyedVectors.load_word2vec_format(self.path, 
                                                       binary=True, 
                                                       unicode_errors="ignore")
        self.mot = mot if mot != "test" else self.vocab_list()
        self.nb = 99*2
        self.vocab = None
        self.idx = np.arange(self.nb, 0 , -1) / 2
        self.dic = None
                
    def word_in_vocab(self) -> bool:
        # teste si le mot à deviner rentrer par l'utilisateur est dans le vocabulaire
        if self.mot in list(set(self.model.key_to_index.keys())):
            self.vocab = [x[0] for x in (self.model.most_similar(self.mot, topn=self.nb))]
            return True         
        return False      
        
    def test_pluriel(self) -> None:
        # teste si le singulier ou le pluriel du mot est dans la liste sémantique
        # non utile si le modèle à une préparation du corpus avec lemmatisation
        test1 = self.mot + "s"
        test2 = self.mot[:-1] 
        if test1 in self.vocab:
            self.vocab.remove(test1)
        if test2 in self.vocab:
            self.vocab.remove(test2)
        
        
    def vocab_list(self) -> str:
        # choix d'un mot à deviner aléatoire dans le corpus
        vocab = list(set(self.model.key_to_index.keys()))
        for i in vocab:
            try:
                if '<' in i:
                    vocab.remove(i)
                if len(i) < 4:
                    vocab.remove(i)
                if " " in i:
                    vocab.remove(i)
                if "'" in i:
                    vocab.remove(i)   
            except:
                pass
        return random.choice(vocab)


    def in_list(self) -> None:
        # mets mots et pourcentages en dictionnaire
        self.dic = {
            self.mot : 100
        }
        for i in range(len(self.vocab)):
            self.dic[self.vocab[i]] = self.idx[i]
    

    def test_response(self, w:str) -> bool:
        # vérifie que le mot est dans la liste de mots
        return w in self.dic.keys()


    def pct(self, w:str) -> float:
        # retourne le score en pourcentage du mot entré par l'utilisateur
        return float(self.dic[w]) if self.test_response(w) else 0
    
    
    def run(self) -> bool:
        if self.word_in_vocab():
            self.test_pluriel()
            self.in_list()
            return True 
        return False