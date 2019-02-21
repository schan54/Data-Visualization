import shutil

#Small script to sort world pop file by ID
"""
for line in sorted(inFile, key=lambda line: line.split()[0]):
    outFile.write(line)
"""

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


def main():

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
                yearAndValue = year + "," + value
                #print("%s"% yearAndValue)

                #print(value)
                valueNum = float(value) * 100000
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
                                #lineString = worldLine.rstrip('\n') + '\t' + yearAndValue + '\n'
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



#Calls the needed functions
createBaseFile()
main()






"""
    #Was working on getting ALL data onto sheet but hit a wall for maybe an hour
    #So i just simplified it for a single year right now to get data on maps

        with open('tempFile.tsv', 'w+') as tp:
            for tempLine in tp:
                print("%s" % tempLine)



            try:
                if country in worldLine:
                    print("mapping %s to %s"% (country, worldLine))
                    #lineString = worldLine.rstrip('\n') + '\t' + yearAndValue + '\n'
                    #print("%s"% lineString)
                    #outFile.write(lineString)
            except:
                #pass
                print("Failed to create new string") """
