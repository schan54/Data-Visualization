import os
def readFiles(filename):
    with open(filename) as cp:
        tempList = []
        for line in cp:
            tempList.append(line.strip('\r\n'))
        return tempList

def getYears():
    yearList = []
    for i in range(1990, 2018):
        yearList.append(i)
    return yearList

def writeToFile(outFileString, yearList, fileAsList):
    outFile = open(outFileString, 'w+')
    outFile.write("[\n")

    for i in range(1,29):
        outFile.write('\t{\n')
        outFile.write('\t\t"name": ' + str(yearList[i-1]) + ",\n")
        outFile.write('\t\t"children": [\n' )


        for values in fileAsList:
            splitLine = values.split('\t')
            if i != 28:
                outFile.write('\t\t\t{"name": "' + splitLine[0] + '", "size":' + str(splitLine[i]) + '},\n')
            else:
                outFile.write('\t\t\t{"name": "' + splitLine[0] + '", "size":' + str(splitLine[i]) + '}\n')

        outFile.write('\t\t]\n')
        if i !=28:
            outFile.write('\t},\n')
        else:
            outFile.write('\t}\n')

    outFile.close()

def start():
    yearList = getYears()
    for filename in os.listdir(os.getcwd()):
        if '.tsv' not in filename:
            pass
        else:
            fileString = filename.replace('.tsv', '.json')
            fileString = '../' + fileString
            fileAsList = readFiles(filename)
            writeToFile(fileString, yearList, fileAsList)

start()
