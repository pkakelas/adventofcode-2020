package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func readInput() []int {
	numbers := []int{}

	f, _ := os.Open("./input.txt")
	defer f.Close()

	scanner := bufio.NewScanner(f)

	for scanner.Scan() {
		num, _ := strconv.Atoi(scanner.Text())
		numbers = append(numbers, num)
	}

	return numbers
}

func sumOf2(nums []int) int {
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i] + nums[j] == 2020 {
				return nums[i] * nums[j]
			}
		}
	}
	return -1
}

func sumOf3(nums []int) int {
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			for k := i + 1; k < len(nums); k++ {
				if nums[i] + nums[j] + nums[k] == 2020 {
					return nums[i] * nums[j] * nums[k]
				}
			}
		}
	}

	return -1
}

func main() {
	nums := readInput()

	fmt.Println("Sum of 2:", sumOf2(nums))
	fmt.Println("Sum of 3:", sumOf3(nums))
}
