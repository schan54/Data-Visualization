import shutil

#Creates basefile which only has id & name
def createBaseFile():
    baseFile = open("base-worldco2.tsv", 'w+')
    with open('world_population.tsv') as cp:
        for line in cp:
            try:
                split = line.split("\t")
                thisString = split[0] + '\t' + split[1] + '\n'
                #print("%s"% thisString)
                baseFile.write(thisString)
            except:
                print("Failed to split world tsv: %s" % line)
    baseFile.close()


def createSingleYear():

    #Prompts user for date and created file names
    inputYear = input("Enter year to create column for .csv:\n\n")
    fileString = "worldco2-" + str(inputYear) + '.tsv'
    outFile = open(fileString, 'w+')
    headerString = "id\tname\tpopulation\n"
    outFile.write(headerString)

    #Iterate through your data file and map data
    with open('co2.csv','r') as fp:

        for line in fp:
            try:
                country, year, value, cont = line.split(",")
                #print("%s"% yearAndValue)

                #print(value)
                valueNum = float(value)
                #valueNum = valueNum * 100
                #print(valueNum)
                #If year of data matches input keep going
                if int(year) == inputYear:

                    with open('base-worldco2.tsv', 'r') as tp:
                        countryFound = 0
                        for worldLine in tp:
                            #print("%s" % worldLine)

                            #If the country found between both files match
                            if country in worldLine:
                                countryFound = 1
                                lineString = worldLine.rstrip('\n') + '\t' + str(valueNum) + '\n'
                                #print("%s" % lineString)
                                outFile.write(lineString)

                        if countryFound == 0:
                            print("Failed to find country:%s"% country)

            except:
                if str(inputYear) in line:
                    print("Failed to parse line: %s" % line.rstrip('\n'))
                pass
    outFile.close()
    print("\nSuccess\t%s" % fileString)

    #Keep one copy and here and move one up a directory
    #Easy to run for you!
    shutil.copy2(fileString, '../world_population.tsv')


def createDataAsList():
    print('\n')
    #Iterate through your data file and map data
    with open('co2.tsv','r') as fp:
        lists = []
        yearList = []
        for line in fp:
            try:
                country, year, value, cont = line.split("\t")
                info = [country, value, year]
                #print("Info is %s" %info)
                if not value:
                    value = "NaN"

                foundCountryFlag = 0

                for tuples in lists:

                    if country in tuples[0]:
                        foundCountryFlag = 1
                        #Grab string and update with additional year,value data
                        updateString = tuples[1]
                        updateString = updateString.rstrip('\n') + '\t' + value + '\n'
                        tuples[1] = updateString
                        if year not in yearList:
                            yearList.append(year)

                #Country not in list, add it to list
                if foundCountryFlag == 0:
                    lists.append(info)

            except:
                print("Failed to parse line: %s" % line.rstrip('\n'))

    addFullDataToBase(lists, yearList)

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
    fileString = "worldco2.tsv"
    outFile = open(fileString, 'w+')

    #Create headerString with Years
    headerString = createTsvHead(yearList)
    #print(headerString)
    outFile.write(headerString)

    with open('base-worldco2.tsv', 'r') as tp:

        for worldLine in tp:
            countryFound = 0
            #If the country found between list and world_pop matches
            for tuples in lists:
                if tuples[0] in worldLine:
                    #print("Matched %s to %s" % (tuples[0], worldLine))
                    countryFound = 1
                    #lineString = worldLine.rstrip('\n') + '\t' + yearAndValue + '\n'
                    lineString = worldLine.rstrip('\n') + '\t' + tuples[1]
                    #print("%s" % lineString)
                    outFile.write(lineString)

            if countryFound == 0:
                print("Failed to find match:\t%s"% worldLine.rstrip('\n'))
    print("\nSuccess\t%s" % fileString)
    outFile.close()
    #print("\nSuccess\t%s" % fileString)

        #Keep one copy and here and move one up a directory
        #Easy to run for you!
        #shutil.copy2(fileString, '../world_population.tsv')

#Prompt user and use calls from there
userInput = input("\npress 1 for Single year, Anything else for All years\n\n")
if userInput == 1:
    createSingleYear()
else:
    createDataAsList()
