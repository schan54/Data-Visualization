import shutil
import os
#Creates basefile which only has id & name
def createBaseFile():
    baseFile = open("../base-worldtemp.tsv", 'w+')
    with open('../world_populationOG.tsv') as cp:
        for line in cp:
            try:
                split = line.split("\t")
                thisString = split[0] + '\t' + split[1] + '\n'
                #print("%s"% thisString)
                baseFile.write(thisString)
            except:
                print("Failed to split world tsv: %s" % line)
    baseFile.close()

def createTsvHead(yearList):
    startYear = yearList[0]
    endYear = yearList[-1]
    headerString = "id\tname\n"

    for i in range (int(startYear),int(endYear) + 1):
        headerString = headerString.rstrip('\n') + '\t' + str(i) + '\n'
    #print(headerString)
    return headerString

def addFullDataToBase(lists, yearList):
    print("\n")
    fileString = "worldco2AllData.tsv"
    outFile = open(fileString, 'w+')

    #Create headerString with Years
    headerString = createTsvHead(yearList)
    #print(headerString)
    outFile.write(headerString)

def createTemperatureTsv():

    fileString = "worldTemp.tsv"
    lista = [1901, 2014]
    headerString = createTsvHead(lista)
    outFile = open(fileString, 'w+')
    outFile.write(headerString)

    for filename in os.listdir(os.getcwd()):
        running = True
        with open(filename) as cp:
            if filename == 'convert.py':
                running = False
            count = 0
            list = []
            tempString = "\n"
            for line in cp:
                if not running:
                    break
                count+=1

                if "Country = " in line:
                    split = line.split(" ")
                    country = split[2].replace('_',' ')
                    country = country.replace('-',' ')
                    with open('../base-worldtemp.tsv') as cp:
                        countryFound = 0
                        for baseLine in cp:
                            if country in baseLine:
                                countryFound = 1
                                #print("Success: Found country%s:\t"%country)
                        if countryFound == 0:
                            running = False
                            #print("Failed to find country:\t%s"%country)



                if count >= 5:
                    split = line.split(" ")
                    if len(split) <= 1:
                        break
                    tempString = tempString.rstrip('\n') + '\t' + split[-1] + '\n'
                    #print(split[1])
                    if split[1] == "2014":
                        with open('../base-worldtemp.tsv') as cp:
                            for baseLine in cp:
                                if country in baseLine:
                                    updateString = baseLine.rstrip('\n') + '\t' + tempString
                                    outFile.write(updateString)
def createSingleYear():
    inputYear = input("Enter year to create column for .tsv:\n\n")
    fileString = "worldtemp-" + str(inputYear) + '.tsv'
    outFile = open(fileString, 'w+')
    headerString = "id\tname\tpopulation\n"
    outFile.write(headerString)

    with open("worldTemp.tsv") as fp:
        count = 0
        for line in fp:
            #print(line)
            count += 1
            line.rstrip('\n')
            split = line.split('\t')

            if count == 1:
                yearIndex = split.index(str(inputYear))
            else:
                try:
                    id = split[0]
                    name = split[1]
                    value = split[yearIndex]
                    valueAsInt = float(value) **
                    updateString = id + '\t' + name + '\t' + str(valueAsInt) + '\n'
                    print(updateString)
                    outFile.write(updateString)
                except:
                    pass


    outFile.close()
    shutil.copy2(fileString, '../world_population.tsv')
createBaseFile()
createTemperatureTsv()
createSingleYear()



"""
def createSingleYear():

    #Prompts user for date and created file names
    inputYear = input("Enter year to create column for .csv:\n\n")
    fileString = "worldtemp-" + str(inputYear) + '.tsv'
    outFile = open(fileString, 'w+')
    headerString = "id\tname\tpopulation\n"
    outFile.write(headerString)


    #Iterate through your data file and map data
    outFile.close()

    print("\nSuccess\t%s" % fileString)

    #Keep one copy and here and move one up a directory
    #Easy to run for you!
    shutil.copy2(fileString, '../world_population.tsv')
"""


def createTsvHead(yearList):
    startYear = yearList[0]
    endYear = yearList[-1]
    headerString = "id\tname\n"

    for i in range (int(startYear),int(endYear) + 1):
        headerString = headerString.rstrip('\n') + '\t' + str(i) + '\n'
    #print(headerString)
    return headerString


"""
#Prompt user and use calls from there
userInput = input("\npress 1 for Single year, Anything else for All years\n\n")
if userInput == 1:
    createBaseFile()
    createSingleYear()
else:
    createBaseFile()
    createDataAsList()
"""
