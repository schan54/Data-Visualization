import shutil


def createDataAsList():
	with open('co2.csv','r') as fp:
		fullList = []
		compareList = []
		for line in fp:
			tempList = []
			try:
				line = line.rstrip("\r\n")
				country,year,value,cont = line.split(",")
				if (int(year) >= 2007):
					tempList = [country, year, value, cont]
					fullList.append(tempList)
				if (int(year) == 2017):
					tempList = [country, year, value, cont]
					compareList.append(tempList)
			except:
				 print("Failed to parse line: %s" % line.rstrip('\n'))
		return fullList, compareList


def generateScalars(list):
	#print(list)
	tenYearScalar = []
	indexLength = 219

	for index in range (0,219):
		value = 0
		for x in range(0,11):
			line  = list[index+(x*indexLength)]
			print(line[1])
			print(line[2])
			try:
				value += float(line[2])
			except:
				pass
			#print(value)
			#add if not in list
			if x == 0:
				tenYearScalar.append(line)

			print(x)
			#update scalar value for
			if x == 10:
				print(value/11)
				value = value/11
				tenYearScalar[index][2] = value
				print("\n")

	return tenYearScalar

def createPredictiveData(list, compareList):
	#print(list)
	indexLength = 219

	fileString = "co2New.csv"
	outFile = open(fileString, 'w+')

	for index in range (0,218):
		for x in range(1,39):
			#print(list[index])
			if (list[index][2]) == '':
				break
			elif (compareList[index][2]) == '':
				break
			else:
				country = list[index][0]
				continent = list[index][3]
				#scale value by scalar * newyear

				compareVal = compareList[index][2]

				#print(compareVal)
				value = (float(compareVal) - float(list[index][2])) * x

				value = value / 5
				#increase year
				year = int(list[index][1]) + 10 + x

				#create string
				lineString = country + ',' + str(year) + ',' + str(value) + ',' + continent + "\r\n"
				outFile.write(lineString)


thisList, compareList = createDataAsList()
scalar = generateScalars(thisList)
#print(scalar)
predictiveList = createPredictiveData(scalar, compareList)
