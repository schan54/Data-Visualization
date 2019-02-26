def readFile():
    inFile = "Enerdata_Energy_Statistical_Yearbook_2018 - Total energy production.tsv"
    with open(inFile) as fp:
        yearList = []
        countryList = []

        for line in fp:
            splitLine = line.split('\t')
            if "1990\t1991" in line:
                indexCount = 0
                for year in splitLine:
                    if indexCount > 27:
                        break
                    yearList.append(year)
                    indexCount += 1
                #print(yearList)
            else:
                count = 0
                tempList = []
                for values in splitLine:
                    if count > 28:
                        break
                    if count >= 0:
                        tempList.append(values)
                    #print(values)
                    count +=1
                countryList.append(tempList)
        return yearList, countryList

def writeToFile(string, yearList, countryList):
    outFile = open(string, 'w+')
    outFile.write("[\n")

    for i in range(1,29):
        outFile.write('\t{\n')
        outFile.write('\t\t"name": ' + yearList[i-1] + ",\n")
        outFile.write('\t\t"children": [\n' )
        for entries in countryList:
            outFile.write('\t\t\t{"name": ' + entries[0] + ' , "size": ' + entries[i] + '},\n')
        outFile.write('\t\t]\n')
        outFile.write('\t},\n')
    outFile.write(']\n')

    outFile.close()


yearList, countryList = readFile()
outFileString = "totalEnergy.json"
writeToFile(outFileString, yearList, countryList)
