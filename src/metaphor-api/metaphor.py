import datetime
import os

from dotenv import load_dotenv
from metaphor_python import Metaphor


def main():
    load_dotenv()
    METAPHOR_API_KEY = os.getenv('METAPHOR_API_KEY')
    client = Metaphor(api_key=METAPHOR_API_KEY)

    user = input("What are you looking for? ")
    print()
    print("Here are your results!")

    today = datetime.date.today()
    one_year_ago = today - datetime.timedelta(days=365)

    response = client.search(user, num_results=10, 
                            include_domains=["scholar.google.com", "jstor.org", "ncbi.nlm.nih.gov", "springer.com", "ieeexplore.ieee.org", "sciencedirect.com", "onlinelibrary.wiley.com", "nature.com", "pnas.org", "arxiv.org", "frontiersin.org", "dl.acm.org"],
                            start_published_date=str(one_year_ago), 
                            use_autoprompt=True,)

    for result in response.results:
        print(result.title, result.url, result.id)
        print()


if __name__ == '__main__':
    main()
