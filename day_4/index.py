import string

def getRecords():
    with open('./input.txt') as f:
        records = f.read().split('\n\n')
        records = list(map(lambda r: r.replace('\n', ' '), records))
        return list(map(parseRecord, records))

# string => [(k, v), (k, v), ..]
def parseRecord(record):
    key_values = record.split(' ')
    return list(map(lambda kv: kv.split(':'), key_values))

# [(k, v), (k, v), ..] => bool
def hasAllKeys(record):
    essential = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    keys = list(map(lambda kv: kv[0], record))

    for k in essential:
        if k not in keys:
            return False
    
    return True

def hasValidValues(record):
    for kv in record:
        if kv[0] == 'byr' and not validate_byr(kv[1]):
            return False
        if kv[0] == 'iyr' and not validate_iyr(kv[1]):
            return False
        if kv[0] == 'eyr' and not validate_eyr(kv[1]):
            return False
        if kv[0] == 'hgt' and not validate_hgt(kv[1]):
            return False
        if kv[0] == 'hcl' and not validate_hcl(kv[1]):
            return False
        if kv[0] == 'ecl' and not validate_ecl(kv[1]):
            return False
        if kv[0] == 'pid' and not validate_pid(kv[1]):
            return False
    return True

def validate_byr(byr):
    return 1920 <= int(byr) <= 2002

def validate_iyr(iyr):
    return 2010 <= int(iyr) <= 2020

def validate_eyr(eyr):
    return 2020 <= int(eyr) <= 2030

def validate_hgt(hgt):
    if not(hgt[-2:] in ("cm","in") and hgt[:-2].isnumeric()):
        return False
    if hgt[-2:] == 'in' and 59 <= int(hgt[:-2]) <= 76:
        return True
    if hgt[-2:] == 'cm' and 150 <= int(hgt[:-2]) <= 193:
        return True
    
    return False

def validate_hcl(hcl):
    if not(len(hcl) == 7 and hcl[0] == "#"):
        return False
    return all(c in string.hexdigits for c in hcl[1:])


def validate_ecl(ecl):
    return ecl in ("amb", "blu", "brn", "gry", "grn", "hzl", "oth")

def validate_pid(pid):
    return len(pid) == 9 and pid.isnumeric()

def main():
    records = getRecords()
    valid_records = list(filter(lambda l: hasAllKeys(l), records))
    print("Solution a:", len(valid_records))

    fully_valid_records = list(filter(lambda l: hasValidValues(l), valid_records))
    print("Solution b:", len(fully_valid_records))

main()