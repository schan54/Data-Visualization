import shutil
import os
#Creates basefile which only has id & name
def createBaseFile():
    baseFile = open("../base.tsv", 'w+')
    with open('../world_population.tsv') as cp:
        for line in cp:
            try:
                split = line.split("\t")
                thisString = split[0] + '\t' + split[1] + '\n'
                #print("%s"% thisString)
                baseFile.write(thisString)
            except:
                print("Failed to split world tsv: %s" % line)
    baseFile.close()

def createTsvHead():
    headerString = "year\tmonth\ttemp\n"
    #print(headerString)
    return headerString

def addFullDataToBase(lists, yearList):
    print("\n")
    fileString = "../steveAllData.tsv"
    outFile = open(fileString, 'w+')

    #Create headerString with Years
    headerString = createTsvHead(yearList)
    #print(headerString)
    outFile.write(headerString)

def createTemperatureTsv():

    fileString = "worldTemp.tsv"
    headerString = createTsvHead()
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
                    tempString = tempString.rstrip('\n') + '\t' + split[-1]
                    #print(split[1])
                    if split[1] == "2014":
                        with open('../base-worldtemp.tsv') as cp:
                            for baseLine in cp:
                                if country in baseLine:
                                    updateString = baseLine.rstrip('\n') + '\t' + tempString
                                    outFile.write(updateString)
def createSingleSteve():
    fileString = "test.tsv"
    outFile = open(fileString, 'w+')
    headerString = "year\tmonth\ttem\n"
    outFile.write(headerString)

    with open("crucy.v3.23.1901.2014.Actaeon_Group.tmp.per") as fp:
        count = 0
        for line in fp:
            count += 1
            if count >= 5:
                split = line.split(" ")
                if len(split) <= 1:
                    break
                year = split[1]

                monthCounter = -2
                for val in split:
                    if (val != "") and (monthCounter <= 10):
                        monthCounter+=1
                        if '.' in val:
                            tuple = year, monthCounter, val
                            outString = year + '\t' + str(monthCounter) + '\t' + val + '\n'
                            outFile.write(outString)
    outFile.close()

#createSingleSteve()

def createAllSteve():

    for filename in os.listdir(os.getcwd()):
        running = True
        with open(filename) as cp:
            if '.per' not in filename:
                running = False

            fileString = filename.replace('.per', '.tsv')
            fileString = '../../' + fileString
            headerString = createTsvHead()
            outFile = open(fileString, 'w+')
            outFile.write(headerString)

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
                            os.remove(fileString)

                split = line.split(" ")
                if count >= 5:
                    if len(split) <= 1:
                        break

                    monthCounter = -2
                    year = split[1]
                    for val in split:
                        if (val != "") and (monthCounter <= 10):
                            monthCounter+=1
                            if '.' in val:
                                tuple = year, monthCounter, val
                                outString = year + '\t' + str(monthCounter) + '\t' + val + '\n'
                                outFile.write(outString)
            outFile.close()

createAllSteve()
"""
                    tempString = tempString.rstrip('\n') + '\t' + split[-1]
                    #print(split[1])
                    if split[1] == "2014":
                        with open('../base-worldtemp.tsv') as cp:
                            for baseLine in cp:
                                if country in baseLine:
                                    updateString = baseLine.rstrip('\n') + '\t' + tempString
                                    outFile.write(updateString)
"""


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
