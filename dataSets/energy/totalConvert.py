import os
def readFiles():
    for filename in os.listdir(os.getcwd()):
        with open(filename) as cp:
            if '.tsv' not in filename:
                break
            fileString = filename.replace('.tsv', '.json')
            fileString = '../' + fileString
            outFile = open(fileString, 'w+')
            countryList = []

            headerName = filename.strip('.tsv')
            countryList.append(headerName)

            for line in cp:
                splitLine = line.split('\t')
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

            return countryList

def getYears():
    yearList = []
    for i in range(1990, 2018):
        yearList.append(i)
    print yearList
    return yearList

def writeToFile(string, yearList, countryList):
    outFile = open(string, 'w+')
    outFile.write("[\n")

    for i in range(1,29):
        outFile.write('\t{\n')
        outFile.write('\t\t"name": ' + yearList[i-1] + ",\n")
        outFile.write('\t\t"children": [\n' )
        for entries in countryList:
            outFile.write('\t\t\t{"name": "' + entries[0] + '" , "size": ' + entries[i] + '},\n')
        outFile.write('\t\t]\n')
        if i == 28:
            outFile.write('\t}\n')
        else:
            outFile.write('\t},\n')

    outFile.write(']\n')

    outFile.close()

def start():
    yearList = getYears()
    everythingList = []

getYears()
