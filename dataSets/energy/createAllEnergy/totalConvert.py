import os
def readFiles(filename):
    with open(filename) as cp:
        if '.tsv' not in filename:
            return
        fileString = filename.replace('.tsv', '.json')
        fileString = '../' + fileString
        outFile = open(fileString, 'w+')
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

def writeToFile(outFileString, yearList, countryList, allList):
    outFile = open(outFileString, 'w+')
    outFile.write("[\n")

    for i in range(1,29):
        outFile.write('\t{\n')
        outFile.write('\t\t"name": ' + str(yearList[i-1]) + ",\n")
        outFile.write('\t\t"children": [\n' )
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

            outFile.write('\t\t\t{"name": "' + country + '" , "size": "' + str(totalVal) + '",\n')
            outFile.write('\t\t\t"children":[\n')
            for files in allList:

                if files == None:
                    pass
                else:
                    category = files[-1]
                    for lines in files:
                        if lines[0] == country:
                            outFile.write('\t\t\t\t{"name": "' + category + '", "size": ' + lines[i] + '},\n')
            if country != countryList[-1]:
                outFile.write('\t\t\t]},\n')
            else:
                outFile.write('\t\t\t]}\n')

        outFile.write('\t\t]\n')
        if i == 28:
            outFile.write('\t}\n')
        else:
            outFile.write('\t},\n')

    outFile.write(']\n')

    outFile.close()

def start():
    yearList = getYears()
    allList = []
    for filename in os.listdir(os.getcwd()):
        testList = []
        testList = readFiles(filename)
        allList.append(testList)

    outFileString = 'allEnergy.json'
    writeToFile(outFileString, yearList, countryList, allList)

#global countryList for access purposes
countryList = []
start()
