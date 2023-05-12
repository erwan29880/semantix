import os
from semant import Semantix 

def test_init():
    s = Semantix()
    assert os.path.exists(s.path)    
    
def test_word_in_vocab():
    s = Semantix("rideau")
    assert s.word_in_vocab()
    
def test_vocab_list():
    s = Semantix("rideau")
    assert len(s.vocab_list()) > 0
    
def test_in_list():
    s = Semantix("rideau")
    s.word_in_vocab()
    s.in_list()
    assert len(s.dic) == 199
    
def test_test_response():
    s = Semantix("rideau")
    s.word_in_vocab()
    s.in_list()
    assert s.test_response("rideau")
