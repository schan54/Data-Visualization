def cleanTSVs():
    for filename in os.listdir(os.getcwd()):
        with open(filename) as cp:
            if '.tsv' not in filename:
                break
            splitName = filename.split('-')
            fileString = "../" + splitName[1].rstrip(' ')
            outFile = open(fileString, 'w+')
            for line in cp:
                splitLine = line.split('\t')
                if len(splitLine[28]) <= 1:
                    pass
                elif ('1990\t1991') in line:
                    pass
                else:
                    outFile.write(line)
            outFile.close()
cleanTSVs()
