import os
def readFiles(filename):
    with open(filename) as cp:
        if '.tsv' not in filename:
            return
        if 'base.tsv' in filename:
            return

        thisFileList = []
        global countryList

        for line in cp:
            splitLine = line.split('\t')
            count = 0
            tempList = []
            for values in splitLine:
                if count > 28:
                    break
                if count >= 0:
                    tempList.append(values)

                if count == 0 and values not in countryList:
                    countryList.append(values)
                #print(values)
                count +=1
            thisFileList.append(tempList)
        categoryString = filename.strip('.tsv')
        thisFileList.append(categoryString)
        return thisFileList

def getYears():
    yearList = []
    for i in range(1990, 2018):
        yearList.append(i)
    return yearList
def createTotalValues(countryList):
    matchCountryList = []
    #print(countryList)
    idList = []
    consumptionList = []
    productionList = []
    with open("base.tsv") as cp:
        for line in cp:
            splitLine = line.split('\t')
            #print(splitLine[1])
            dictionaryCountry = splitLine[1].rstrip('\n')
            matchFlag = 0
            for country in countryList:
                if dictionaryCountry == country:
                    matchFlag = 1
                    matchCountryList.append(country)
                    idList.append(splitLine[0])
            if matchFlag == 0:
                print("Failed to find matched country for %s"% splitLine[1].rstrip('\n'))

    return matchCountryList, idList

def writeToFile(outFileString, yearList, countryList, allList):
    outFile = open(outFileString, 'w+')
    outFile.write("[\n")

    for i in range(1,29):
        totalVal = 0
        production = 0
        consumption = 0
        for country in countryList:

            for file in allList:

                if file == None:
                    pass
                else:
                    category = file[-1]

                    if "energy production" in category:
                        for lines in file:
                            if lines[0] == country:
                                production = lines[i]
                                print("Category is %s\n" % category)
                                print("Production is %s\n" % production)

                    if "energy consumption" in category:
                        for lines in file:
                            if lines[0] == country:
                                consumption = lines[i]
                                print("Category is %s\n" % category)
                                print("conumption is %s\n" % consumption)
            totalVal = float(production) - float(consumption)

            outFile.write('\t\t\t{"name": "' + country + '" , "size": ,"' + str(totalVal) + '"\n')
            outFile.write('\t\t\t"children":[\n')
            for files in allList:

                if files == None:
                    pass
                else:
                    category = files[-1]
                    for lines in files:
                        if lines[0] == country:
                            outFile.write('\t\t\t\t{"name": ' + category + ', "size": ' + lines[i] + '},\n')
            outFile.write('\t\t\t]},\n')

        outFile.write('\t\t]\n')
        if i == 28:
            outFile.write('\t}\n')
        else:
            outFile.write('\t},\n')

    outFile.write(']\n')

    outFile.close()

def writeTotaltoFile(outFileString, yearList, matchCountryList, allList, idList):
    outFile = open(outFileString, 'w+')
    headerString = ("id\tname")
    secondHeaderString = ""
    for i in range(0, len(yearList)):
        secondHeaderString += "\t" + str(yearList[i])
    headerString += secondHeaderString + '\n'
    #print (headerString)
    outFile.write(headerString)

    counter = 0
    for country in matchCountryList:
        productionList = []
        consumptionList = []
        totalList = []
        for file in allList:

            if file == None:
                pass
            else:
                category = file[-1]

                if "energy production" in category:
                    for lines in file:
                        if lines[0] == country:
                            for i in range(len(yearList)):
                                #print(country, lines[i+1])
                                productionList.append(lines[i+1])

                if "energy consumption" in category:
                    for lines in file:
                        if lines[0] == country:
                            for i in range(len(yearList)):
                                print(country, lines[i+1])
                                consumptionList.append(lines[i+1])

        if len(productionList) == len(consumptionList):
            for i in range(len(yearList)):
                value = float(productionList[i]) - float(consumptionList[i])
                totalList.append(value)

            lineString = idList[counter] + "\t" + country
            for i in range(len(yearList)):
                lineString+= "\t" + str(totalList[i])
            lineString+= "\n"
            outFile.write(lineString)



        counter+= 1
    outFile.close()


def start():
    yearList = getYears()
    allList = []
    for filename in os.listdir(os.getcwd()):
        testList = []
        testList = readFiles(filename)
        allList.append(testList)

    #outFileString = 'totalEnergyVal.tsv'
    #writeToFile(outFileString, yearList, countryList, allList)
    matchCountryList = []
    idList = []
    matchCountryList, idList = createTotalValues(countryList)
    outFileString = 'energyChloro.tsv'
    writeTotaltoFile(outFileString, yearList, matchCountryList, allList, idList)


#global countryList for access purposes
countryList = []
start()
