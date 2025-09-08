@echo off
echo Bat dau import tat ca collections vao MongoDB...

echo Dang import drugs collection...
docker exec -it ddis-mongodb mongoimport --db Check_DDIs --collection drugs --file /data/import/Drug_interactions.drugs.json --jsonArray

echo Dang import drug_interaction collection...
docker exec -it ddis-mongodb mongoimport --db Check_DDIs --collection drug_interaction --file /data/import/Drug_interactions.drug_interaction.json --jsonArray

echo Dang import client collection...
docker exec -it ddis-mongodb mongoimport --db Check_DDIs --collection client --file /data/import/Drug_interactions.client.json --jsonArray

echo Dang import interaction_history collection...
docker exec -it ddis-mongodb mongoimport --db Check_DDIs --collection interaction_history --file /data/import/Drug_interactions.interaction_history.json --jsonArray

echo Dang import prescriptions collection...
docker exec -it ddis-mongodb mongoimport --db Check_DDIs --collection prescriptions --file /data/import/Drug_interactions.prescriptions.json --jsonArray

echo.
echo Hoan thanh import tat ca collections!
echo.

echo Kiem tra so luong documents trong moi collection:
docker exec ddis-mongodb mongosh Check_DDIs --eval "db.drugs.countDocuments()"
docker exec ddis-mongodb mongosh Check_DDIs --eval "db.drug_interaction.countDocuments()"
docker exec ddis-mongodb mongosh Check_DDIs --eval "db.client.countDocuments()"
docker exec ddis-mongodb mongosh Check_DDIs --eval "db.interaction_history.countDocuments()"
docker exec ddis-mongodb mongosh Check_DDIs --eval "db.prescriptions.countDocuments()"

pause

