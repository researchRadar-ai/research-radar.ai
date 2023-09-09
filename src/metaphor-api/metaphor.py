import datetime
import os
import yake

from dotenv import load_dotenv
from metaphor_python import Metaphor
from collections import defaultdict


def main():
    load_dotenv()
    METAPHOR_API_KEY = os.getenv('METAPHOR_API_KEY')
    metaphor = Metaphor(api_key=METAPHOR_API_KEY)

    user = input("What are you looking for? ")
    print()
    print("Here are your results!")

    today = datetime.date.today()
    one_year_ago = today - datetime.timedelta(days=365)

    response = metaphor.search(user, num_results=10, 
                            include_domains=["scholar.google.com", "jstor.org", "ncbi.nlm.nih.gov", "springer.com", "ieeexplore.ieee.org", "sciencedirect.com", "onlinelibrary.wiley.com", "nature.com", "pnas.org", "arxiv.org", "frontiersin.org", "dl.acm.org"],
                            start_published_date=str(one_year_ago), 
                            use_autoprompt=True,)

    document_dict = defaultdict(str)
    for result in response.results:
        print(result.title, result.url, result.id)
        print()

        document_dict[result.title] = result.id
        keywords = get_keywords(str(document_dict[result.title]), metaphor)
        return keywords

    #print(document_dict.items())

    

def get_keywords(document_id, metaphor):
    response = metaphor.get_contents(document_id)
    text = response.contents[0].extract

    language = "en"
    max_ngram_size = 3
    deduplication_thresold = 0.9
    deduplication_algo = 'seqm'
    windowSize = 1
    numOfKeywords = 10

    kw_extractor = yake.KeywordExtractor(lan=language, 
                                    n=max_ngram_size, 
                                    dedupLim=deduplication_thresold, 
                                    dedupFunc=deduplication_algo, 
                                    windowsSize=windowSize, 
                                    top=numOfKeywords)
                                            
    keywords = kw_extractor.extract_keywords(text)

    important_words = []
    for kw, score in keywords:
        important_words.append(kw)

    return important_words


if __name__ == '__main__':
    main()
