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

    print(document_dict.items())

    get_keywords("mVcN4TkCWpvQ2g-9hxnI7Q", metaphor)

def get_keywords(document_id, metaphor):
    response = metaphor.get_contents(document_id)
    print(response.contents[0].extract)


if __name__ == '__main__':
    main()
