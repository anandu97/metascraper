# metascraper

# To start server
npm start

curl --location --request POST 'http://localhost:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url":"https://www.palnarindia.com/en/home.php"
}'


# mocha is used fot testing

npm test 

# Deployed in ecs fargate as containers

EC2Co-EcsEl-1PYOZM9GOTDRI-1051573587.us-east-2.elb.amazonaws.com/

curl --location --request POST 'EC2Co-EcsEl-1PYOZM9GOTDRI-1051573587.us-east-2.elb.amazonaws.com/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url":"https://www.palnarindia.com/en/home.php"
}'

# memory-cache is used for cache  